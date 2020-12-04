# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2020-12-04
### Changed
- ⚡️ Replace core dependency [`lz4`](https://www.npmjs.com/package/lz4) with the much better maintained [`lz4-asm`](https://www.npmjs.com/package/lz4-asm) library.
- Upgraded all dependencies (including running tests on Kafka v2.5.0)
- Replace Travis CI with Github Actions.

## [1.2.1] - 2019-08-14
### Fixed
- TS errors in tests — via [`688a42c`](https://github.com/indix/kafkajs-lz4/commit/688a42c57523cd5f4116755aae0c30a2dd758688).

## [1.2.0] - 2019-08-14
### Fixed
- Node.js v12 compatibility — via [`#1`](https://github.com/indix/kafkajs-lz4/pull/1). Thanks @ankon!

## [1.1.0] - 2018-09-30
### Changed
- Updated return type for `codec()` from class property to function.

## [1.0.2] - 2018-09-29
### Added
- ⚡️ Full end-to-end tests on Kafka.

## [1.0.1] - 2018-09-29
### Changed
- Relicensed to MIT.

## [1.0.0] - 2018-09-29
### Added
- Initial release 🎉
