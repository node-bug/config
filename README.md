# @nodebug/config

A simple configuration reader for Node.js projects.

## Features

- Reads a default config file at `.config/{appName}.json` in your project root
- Merges environment variables with the config
- Supports command line arguments
- Zero dependencies beyond `rc`
- Supports Node.js `>=24`

## Installation

```bash
npm install @nodebug/config
```

## Usage

```js
import config from '@nodebug/config'

// Load configuration for an app named 'myapp'
const config = config('myapp')

console.log(config)
```

### Configuration File Format

The default config file should be placed at `.config/myapp.json` in your project root:

```json
{
  "port": 3000,
  "host": "localhost",
  "debug": false
}
```

### Environment Variables

Environment variables are automatically merged with the config. For example:

```bash
export MYAPP_PORT=8080
export MYAPP_DEBUG=true
```

### Command Line Arguments

Command line arguments are also merged with the config. For example:

```bash
node app.js --port 8080 --debug true
```

## Development

Make sure to install Husky and lint-staged first:

```bash
npm install --save-dev
```

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

## License

This project is licensed under the MPL-2.0 License.
