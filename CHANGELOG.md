# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-04-12

### Added

- Initial release of the configuration module
- Basic configuration loading from `.config/{appName}.json`
- Integration with the `rc` module for environment variable support
- Support for command line arguments
- Zero dependencies beyond `rc`
- TypeScript definitions (index.d.ts)
- Development dependencies for linting and testing
- Husky pre-commit hooks
- ESLint configuration
- Prettier configuration
- Comprehensive test suite with mocha and chai
- GitHub Actions CI/CD pipeline for linting, testing, and publishing

### Changed

- Updated project to use ES modules (`import`/`export`) syntax
- Improved error handling for invalid JSON files
- Enhanced documentation in README.md
- Updated package.json with development dependencies

## [2.1.0] - 2026-04-12

### Added

- Initial commit with basic configuration functionality

[2.1.1]: https://github.com/node-bug/config/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/node-bug/config/releases/tag/2.1.0
