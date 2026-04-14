import config from '../index.js'

describe('config', () => {
  test('should be a function', () => {
    expect(typeof config).toBe('function')
  })

  test('should return an object when called', () => {
    const result = config('test')
    expect(typeof result).toBe('object')
  })

  test('should handle missing config files gracefully', () => {
    const result = config('nonexistent')
    expect(typeof result).toBe('object')
  })

  test('should merge environment variables with config', () => {
    // Save original environment variable
    const originalEnv = process.env.TEST_CONFIG

    // Set test environment variable
    process.env.TEST_CONFIG = 'test-value'

    const result = config('test')

    // Restore original environment variable
    if (originalEnv !== undefined) {
      process.env.TEST_CONFIG = originalEnv
    } else {
      delete process.env.TEST_CONFIG
    }

    expect(result.TEST_CONFIG).toBe('test-value')
  })
})
