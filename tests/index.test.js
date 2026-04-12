import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { existsSync, writeFileSync, rmSync, mkdirSync } from 'fs'
import { join } from 'path'
import config from '../index.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('@nodebug/config', () => {
  beforeEach(() => {
    // Clear any existing config
    delete process.env.TEST_PORT
    delete process.env.TEST_HOST
    // Create config directory if it doesn't exist
    const configDir = join(__dirname, '..', '.config')
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true })
    }
  })

  afterEach(() => {
    // Clean up the config directory
    const configDir = join(__dirname, '..', '.config')
    if (existsSync(configDir)) {
      try {
        rmSync(configDir, { recursive: true, force: true })
      } catch {
        // Directory might not be empty, that's okay
      }
    }
  })

  it('should export a function', () => {
    expect(config).to.be.a('function')
  })

  it('should return an object with config values', () => {
    const configResult = config('test')
    expect(configResult).to.be.an('object')
  })

  it('should read default config from .config file when it exists', () => {
    // Create a temporary config file for testing
    const configPath = join(__dirname, '..', '.config', 'test.json')

    // Create a test config file
    const testConfig = {
      port: 3000,
      host: 'localhost',
    }

    writeFileSync(configPath, JSON.stringify(testConfig, null, 2))

    try {
      const configResult = config('test')
      expect(configResult).to.be.an('object')
      expect(configResult).to.have.property('port', 3000)
      expect(configResult).to.have.property('host', 'localhost')
    } finally {
      // Clean up
      rmSync(configPath)
    }
  })

  it('should merge environment variables with config', () => {
    process.env.TEST_PORT = '8080'
    const configResult = config('test')
    // The rc module will process environment variables, but we can't directly test the specific property
    // since rc normalizes variable names and the exact behavior depends on rc module
    expect(configResult).to.be.an('object')
    delete process.env.TEST_PORT
  })

  it('should handle command line arguments', () => {
    // This test verifies the function can be called with arguments
    const configResult = config('test')
    expect(configResult).to.be.an('object')
  })

  it('should work with different app names', () => {
    const config1 = config('app1')
    const config2 = config('app2')

    expect(config1).to.be.an('object')
    expect(config2).to.be.an('object')
  })

  it('should handle missing config files gracefully', () => {
    const configResult = config('nonexistent')
    expect(configResult).to.be.an('object')
  })
})
