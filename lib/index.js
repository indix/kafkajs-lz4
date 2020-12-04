"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lz4init = require('lz4-asm');
const lz4Module = {};
const lz4Ready = lz4init(lz4Module);
/**
 * LZ4 Compression codec for the [KafkaJS](https://github.com/tulios/kafkajs) library.
 */
class LZ4Codec {
    constructor(options) {
        this.options = options;
        /**
         * KafkaJS CompressionType-compatible LZ4 codec.
         * @memberof LZ4Codec
         */
        this.codec = () => {
            return {
                compress: this.compress,
                decompress: this.decompress,
            };
        };
    }
    async compress(encoder) {
        return await new Promise((resolve) => {
            return lz4Ready.then((lz4) => {
                var _a;
                const lz4js = lz4.lz4js;
                const compressedBuffer = lz4js.compress(encoder.buffer, Object.assign(Object.assign({}, this.options), { frameInfo: Object.assign(Object.assign({}, (_a = this.options) === null || _a === void 0 ? void 0 : _a.frameInfo), { blockMode: 1 }) }));
                return resolve(compressedBuffer);
            });
        });
    }
    async decompress(buffer) {
        return await new Promise((resolve) => {
            return lz4Ready.then((lz4) => {
                const lz4js = lz4.lz4js;
                const decompressedBuffer = lz4js.decompress(buffer);
                return resolve(decompressedBuffer);
            });
        });
    }
}
exports.default = LZ4Codec;
module.exports = LZ4Codec;
