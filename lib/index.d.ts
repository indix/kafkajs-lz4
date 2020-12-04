/// <reference types="node" />
export interface LZ4Options {
    frameInfo?: {
        /**
         * Number 4 to 7.
         * Available sizes: { 4: "64KB", 5: "256KB", 6: "1MB", 7: "4MB" }
         */
        blockSizeID?: number;
        /**
         * Set to 0 for no checksum.
         * Set to 1 for terminating frame with 32-bit checksum of decompressed data.
         * @default 0
         */
        contentChecksumFlag?: number;
        /**
         * Dictionary ID, sent by compressor to help decoder select correct dictionary.
         * Set to 0 for no dictionary.
         * @default 0
         */
        dictID?: number;
        /**
         * Each block will followed by a checksum of block's compressed data.
         * Set to 0 for no checksum.
         * @default 0
         */
        blockChecksumFlag?: number;
    };
    preferences?: {
        /**
         * Compression level - number 0 to 16.
         * Set to 0 (min) for faster usage but zero compression.
         * Set to 16 (max) for slower usage but best compression.
         * @default 0
         */
        compressionLevel?: number;
        /**
         * Always flush; reduces usage of internal buffers.
         * Set to 0 for disabling flush.
         * Set to 1 for always flush.
         * @default 1
         */
        autoFlush?: number;
        /**
         * Parser favors decompression speed vs compression ratio.
         * Only works for high compression modes.
         * Set to 0 to disable.
         * @default 1
         */
        favorDecSpeed?: number;
    };
}
/**
 * LZ4 Compression codec for the [KafkaJS](https://github.com/tulios/kafkajs) library.
 */
export default class LZ4Codec {
    private options?;
    constructor(options?: LZ4Options | undefined);
    private compress;
    private decompress;
    /**
     * KafkaJS CompressionType-compatible LZ4 codec.
     * @memberof LZ4Codec
     */
    codec: () => {
        compress: (encoder: {
            buffer: Buffer;
        }) => Promise<Buffer>;
        decompress: (buffer: Buffer) => Promise<Buffer>;
    };
}
