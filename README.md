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

## Comprehensive Usage Examples

### 1. Simple Configuration Loading

```javascript
import config from '@nodebug/config'

// Load configuration for your application
const appConfig = config('myapp')
console.log(appConfig.port) // 3000 (from config file)
console.log(appConfig.debug) // false (from config file)
```

### 2. Environment-Specific Configurations

```javascript
// For development
// .config/myapp-dev.json
{
  "port": 3000,
  "debug": true,
  "database": {
    "url": "mongodb://localhost:27017/myapp_dev"
  }
}

// For production
// .config/myapp-prod.json
{
  "port": 8080,
  "debug": false,
  "database": {
    "url": "mongodb://prod-server:27017/myapp_prod"
  }
}

// Usage
const env = process.env.NODE_ENV || 'development'
const config = config(`myapp-${env}`)
```

### 3. Configuration with Fallbacks

```javascript
import config from '@nodebug/config'

const appConfig = config('myapp')

// Access configuration with default values
const port = appConfig.port || 3000
const host = appConfig.host || 'localhost'
const debug = appConfig.debug !== undefined ? appConfig.debug : false
```

### 4. Nested Configuration Objects

```javascript
// .config/myapp.json
{
  "server": {
    "port": 3000,
    "host": "localhost",
    "ssl": {
      "enabled": false,
      "cert": "/path/to/cert.pem"
    }
  },
  "database": {
    "url": "mongodb://localhost:27017",
    "poolSize": 10
  }
}

// Usage
const config = config('myapp')
console.log(config.server.port) // 3000
console.log(config.database.poolSize) // 10
```

### 5. Dynamic Configuration Loading

```javascript
import config from '@nodebug/config'

// Load different configurations based on runtime conditions
function loadConfig(appName) {
  return config(appName)
}

const config1 = loadConfig('myapp')
const config2 = loadConfig('another-app')
```

### 6. Configuration Validation

```javascript
import config from '@nodebug/config'

const appConfig = config('myapp')

// Validate required configuration
if (!appConfig.port) {
  throw new Error('Port configuration is required')
}

// Validate configuration values
if (appConfig.port < 1 || appConfig.port > 65535) {
  throw new Error('Port must be between 1 and 65535')
}
```

### 7. Integration with Other Libraries

```javascript
import config from '@nodebug/config'
import express from 'express'

const appConfig = config('myapp')
const app = express()

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server running on ${appConfig.host}:${appConfig.port}`)
})
```

### 8. Testing Configuration

```javascript
// In test files, you can easily override configuration
import config from '@nodebug/config'

// Set environment variables for testing
process.env.MYAPP_PORT = '8080'
process.env.MYAPP_DEBUG = 'true'

const testConfig = config('myapp')
// testConfig will have port 8080 and debug true
```

### 9. Multi-Environment Support

```javascript
// .config/myapp.json (default)
{
  "port": 3000,
  "host": "localhost",
  "debug": false
}

// .config/myapp-production.json
{
  "port": 8080,
  "debug": false
}

// Usage
const env = process.env.NODE_ENV || 'development'
const config = config(`myapp${env === 'production' ? '-production' : ''}`)
```

### 10. Configuration with Default Values

```javascript
import config from '@nodebug/config'

const appConfig = config('myapp')

// Merge with default values
const finalConfig = {
  port: appConfig.port || 3000,
  host: appConfig.host || 'localhost',
  debug: appConfig.debug || false,
  database: {
    url: appConfig.database?.url || 'mongodb://localhost:27017',
    poolSize: appConfig.database?.poolSize || 10,
  },
}
```

## Advanced Usage Patterns

### 1. Configuration with Custom Merging Logic

```javascript
import config from '@nodebug/config'

function loadAppConfig(appName) {
  const baseConfig = config(appName)

  // Apply custom merging logic
  const mergedConfig = {
    ...baseConfig,
    // Add any additional processing here
    timestamp: Date.now(),
  }

  return mergedConfig
}
```

### 2. Configuration Caching

```javascript
import config from '@nodebug/config'

// Cache configuration to avoid repeated file reads
const configCache = new Map()

function getCachedConfig(appName) {
  if (configCache.has(appName)) {
    return configCache.get(appName)
  }

  const appConfig = config(appName)
  configCache.set(appName, appConfig)
  return appConfig
}
```

### 3. Configuration with Schema Validation

```javascript
import config from '@nodebug/config'

function validateConfig(config, schema) {
  // Simple validation logic
  for (const key in schema) {
    if (schema[key].required && config[key] === undefined) {
      throw new Error(`Required configuration ${key} is missing`)
    }
  }
  return true
}

const appConfig = config('myapp')
const schema = {
  port: { required: true },
  host: { required: true },
}
validateConfig(appConfig, schema)
```

## Benefits of Using This Library

1. **Simplicity**: Easy to integrate and use with minimal setup
2. **Flexibility**: Supports multiple configuration sources with proper merging
3. **No External Dependencies**: Only relies on the `rc` module
4. **Environment Awareness**: Automatically handles environment variables
5. **Command Line Support**: Supports command-line arguments for configuration
6. **Error Handling**: Gracefully handles missing or invalid configuration files
7. **TypeScript Support**: Includes TypeScript definitions for better development experience

This configuration library provides a robust foundation for managing application settings in Node.js projects, supporting various deployment scenarios and configuration management patterns.

## License

This project is licensed under the MPL-2.0 License.
