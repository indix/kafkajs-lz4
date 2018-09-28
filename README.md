# kafkajs-lz4

[![Build Status](https://img.shields.io/travis/indix/kafkajs-lz4/master.svg?style=flat-square)](https://travis-ci.org/indix/kafkajs-lz4) ![TypeScript](https://img.shields.io/badge/typescript-3.1-blue.svg?style=flat-square)


TypeScript-ready [lz4](https://www.npmjs.com/package/lz4) compression codec for [KafkaJS](https://www.npmjs.com/package/kafkajs).

## Install

```bash
$ yarn install kafkajs-lz4
```

## Usage

```typescript
import { CompressionTypes, CompressionCodecs } from 'kafkajs';
import LZ4Codec from 'kafkajs-lz4';

const lz4Codec = new LZ4Codec().codec;

CompressionCodecs[CompressionTypes.LZ4] = () => lz4Codec;
```

## Options

All options are transparently passed on to the [lz4 library's synchronous encoding options](https://www.npmjs.com/package/lz4#synchronous-encoding).

### Example

To allow encoding Kafka messages of up to 25 MB in size —

```typescript
const lz4Codec = new LZ4Codec({
    blockMaxSize: 26214400
}).codec;

CompressionCodecs[CompressionTypes.LZ4] = () => lz4Codec;
```
