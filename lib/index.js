"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lz4_1 = require("lz4");
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
        return lz4_1.encode(encoder.buffer, this.options);
    }
    async decompress(buffer) {
        return lz4_1.decode(buffer);
    }
}
exports.default = LZ4Codec;
module.exports = LZ4Codec;
