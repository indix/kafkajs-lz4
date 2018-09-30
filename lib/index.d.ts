/// <reference types="node" />
export interface LZ4Options {
    /**
     * Chunk size (in bytes) to use.
     * @default 4194304
     */
    blockMaxSize?: number;
    /**
     * Use high compression.
     * @default false
     */
    highCompression?: boolean;
    /**
     * If this flag is set to `true`, blocks are independent.
     * If `false`, each block depends on previous ones (up to LZ4 window size, which is 64 KB).
     * In such case, it is necessary to decode all blocks in sequence.
     * Block dependency improves compression ratio, especially for small blocks.
     * On the other hand, it makes direct jumps or multi-threaded decoding impossible.
     * See https://github.com/lz4/lz4/wiki/lz4_Frame_format.md
     * @readonly
     * @default true
     */
    blockIndependence?: boolean;
    /**
     * Add compressed blocks checksum.
     * @default false
     */
    blockChecksum?: boolean;
    /**
     * Add full LZ4 stream size.
     * @default false
     */
    streamSize?: boolean;
    /**
     * Add full LZ4 stream checksum.
     * @default true
     */
    streamChecksum?: boolean;
    /**
     * Use dictionary.
     * @default false
     */
    dict?: boolean;
    /**
     * Dictionary ID.
     * @default 0
     */
    dictId?: number;
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
