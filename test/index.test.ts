import test from 'tape';
import LZ4Codec from '../src/index';
import { Kafka, CompressionTypes, CompressionCodecs, logLevel } from 'kafkajs';
import waitFor from 'kafkajs/src/utils/waitFor';
import { parse } from 'url';

/**
 * Wraps a promise in a timeout, allowing the promise
 * to reject if not resolve with a specific period of time.
 * @param {number} Milliseconds to wait before rejecting promise if not resolved.
 * @param {promise} Promise to watch.
 */
function promiseTimeout(ms: number, promise: Promise<any>) {
    return new Promise((resolve, reject) => {
        // create a timeout to reject promise if not resolved
        const timer = setTimeout(() => {
            reject(new Error('Promise timed out!'));
        }, ms);
        promise
            .then((res) => {
                clearTimeout(timer);
                resolve(res);
            })
            .catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
    });
}

/**
 * Find docker host address.
 * Workaround for docker-machine.
 */
function findKafkaLocation() {
    const machine = process.env['DOCKER_HOST'] || 'tcp://localhost';
    return parse(machine).hostname;
}

/**
 * Types.
 */

type KafkaMessage = {
    key: Buffer,
    value: Buffer,
};

/**
 * Tests.
 */

test('👩🏻‍🔬 Should set options.', t => {
    t.plan(1);
    const options = {
        blockMaxSize: 1,
        highCompression: true,
    };
    const lz4 = new LZ4Codec(options);
    t.deepEqual(lz4['options'], options, 'options should be transparently passed.');
    t.end();
});

test('👩🏻‍🔬 Should compress and decompress buffers (duh).', async t => {
    t.plan(3);
    const fixture = 'lol';
    const lz4Codec = new LZ4Codec().codec();
    t.is(typeof (lz4Codec.compress), 'function', 'compress() should be a function.');
    t.is(typeof (lz4Codec.decompress), 'function', 'decompress() should be a function.');
    const encoded = await lz4Codec.compress({
        buffer: Buffer.from(fixture),
    });
    const decoded = await lz4Codec.decompress(encoded);
    t.equal(decoded.toString(), fixture, 'data should survive a compress/decompress cycle.');
    t.end();
});

test('👩🏻‍🔬 Should compress and decompress real Kafka messages.', async t => {
    t.plan(2);
    const fixture = {
        topicName: 'topic-test',
        message: {
            key: Buffer.from('lorem'),
            value: Buffer.from(
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit,'
                + 'sed do eiusmod tempor incididunt ut labore et dolore magna '
                + 'aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                + 'ullamco laboris nisi ut aliquip ex ea commodo consequat. '
                + 'Duis aute irure dolor in reprehenderit in voluptate velit '
                + 'esse cillum dolore eu fugiat nulla pariatur. Excepteur '
                + 'sint occaecat cupidatat non proident, sunt in culpa qui '
                + 'officia deserunt mollit anim id est laborum'),
        },
    };
    const kafka = new Kafka({
        brokers: [`${findKafkaLocation()}:9092`],
        clientId: 'kafkajs-lz4',
        logLevel: logLevel.NOTHING,
    });
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: 'lz4-group' });
    const lz4Codec = new LZ4Codec().codec();
    CompressionCodecs[CompressionTypes.LZ4] = lz4Codec;

    await producer.connect();
    await producer.send({
        topic: fixture.topicName,
        compression: CompressionTypes.LZ4,
        messages: [<KafkaMessage>fixture.message],
    });

    const messages: KafkaMessage[] = [];
    consumer.run({ eachMessage: ({ message }) => messages.push(message as KafkaMessage) });
    promiseTimeout(180000, await waitFor(() => messages.length >= 1)).catch(t.fail);

    const message = messages.pop() || { key: null, value: null };
    t.equal(message.key, fixture.message.key);
    t.equal(message.value, fixture.message.value);

    await producer.disconnect();
    await consumer.disconnect();
    t.end();
});
