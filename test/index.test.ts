import test from 'tape';
import LZ4Codec from '../src/index';

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

test('👩🏻‍🔬 Should compress and decompress (duh).', async t => {
    t.plan(3);
    const fixture = 'lol';
    const codec = new LZ4Codec().codec;
    t.is(typeof (codec.compress), 'function', 'compress() should be a function.');
    t.is(typeof (codec.decompress), 'function', 'decompress() should be a function.');
    const encoded = await codec.compress({
        buffer: Buffer.from(fixture),
    });
    const decoded = await codec.decompress(encoded);
    t.equal(decoded.toString(), fixture, 'data should survive a compress/decompress cycle.');
    t.end();
});
