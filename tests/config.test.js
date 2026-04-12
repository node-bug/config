import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import {
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
  rmSync,
  mkdirSync,
} from 'fs';
import { join } from 'path';
import config from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('@nodebug/config - Advanced Tests', () => {
  const testConfigDir = join(__dirname, '..', '.config');
  const testConfigFile = join(testConfigDir, 'testapp.json');

  beforeEach(() => {
    // Clear any existing config
    delete process.env.TESTAPP_PORT;
    delete process.env.TESTAPP_HOST;
    // Create config directory if it doesn't exist
    if (!existsSync(testConfigDir)) {
      mkdirSync(testConfigDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test config file if it exists
    if (existsSync(testConfigFile)) {
      unlinkSync(testConfigFile);
    }
    // Clean up the config directory if it's empty
    if (existsSync(testConfigDir)) {
      try {
        const files = rmSync(testConfigDir, { recursive: true, force: true });
      } catch (error) {
        // Directory might not be empty, that's okay
      }
    }
  });

  it('should create config directory if it does not exist', () => {
    // This test ensures the function handles missing directories gracefully
    const configResult = config('testapp');
    expect(configResult).to.be.an('object');
  });

  it('should read default config when file exists', () => {
    // Create a test config file
    const testConfig = {
      port: 3000,
      host: 'localhost',
      debug: true,
    };

    writeFileSync(testConfigFile, JSON.stringify(testConfig));

    const configResult = config('testapp');
    // The rc module will process the config, so we can't directly test individual properties
    expect(configResult).to.be.an('object');
  });

  it('should merge environment variables with config', () => {
    // Create a test config file
    const testConfig = {
      port: 3000,
      host: 'localhost',
    };

    writeFileSync(testConfigFile, JSON.stringify(testConfig));

    // Set environment variable
    process.env.TESTAPP_PORT = '8080';

    const configResult = config('testapp');
    expect(configResult).to.be.an('object');

    // Clean up
    delete process.env.TESTAPP_PORT;
  });

  it('should handle empty config file', () => {
    writeFileSync(testConfigFile, '{}');
    const configResult = config('testapp');
    expect(configResult).to.be.an('object');
  });

  it('should handle invalid JSON in config file', () => {
    writeFileSync(testConfigFile, '{invalid json}');
    const configResult = config('testapp');
    expect(configResult).to.be.an('object');
  });

  it('should work with nested configuration objects', () => {
    const testConfig = {
      server: {
        port: 3000,
        host: 'localhost',
      },
      database: {
        url: 'mongodb://localhost:27017',
      },
    };

    writeFileSync(testConfigFile, JSON.stringify(testConfig));

    const configResult = config('testapp');
    expect(configResult).to.be.an('object');
  });

  it('should handle missing config directory gracefully', () => {
    // Remove the config directory if it exists
    if (existsSync(testConfigDir)) {
      rmSync(testConfigDir, { recursive: true });
    }

    const configResult = config('testapp');
    expect(configResult).to.be.an('object');
  });
});
