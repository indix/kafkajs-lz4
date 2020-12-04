# kafkajs-lz4

[![Build Status](https://img.shields.io/travis/indix/kafkajs-lz4/master.svg?longCache=true&style=flat-square)](https://travis-ci.org/indix/kafkajs-lz4) [![NPM Version](https://img.shields.io/npm/v/kafkajs-lz4.svg?longCache=true&style=flat-square)](https://www.npmjs.com/package/kafkajs-lz4) ![](https://img.shields.io/badge/typescript-4.1-blue.svg?longCache=true&style=flat-square)

TypeScript-ready [lz4](https://www.npmjs.com/package/lz4) compression codec for [KafkaJS](https://www.npmjs.com/package/kafkajs).

## Install

```bash
$ yarn install kafkajs-lz4
```

## Usage

```typescript
import { CompressionTypes, CompressionCodecs } from 'kafkajs';
import LZ4Codec from 'kafkajs-lz4';

CompressionCodecs[CompressionTypes.LZ4] = new LZ4Codec().codec;
```

## Options

All options are transparently passed on to the [lz4 library's synchronous encoding options](https://www.npmjs.com/package/lz4#synchronous-encoding).

### Example

To allow encoding Kafka messages of up to 25 MB in size —

```typescript
const lz4Codec = new LZ4Codec({
    blockMaxSize: 26214400
}).codec;

CompressionCodecs[CompressionTypes.LZ4] = lz4Codec;
```
