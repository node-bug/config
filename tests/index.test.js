import config from '../index.js'

describe('config', () => {
  test('should be a function', () => {
    expect(typeof config).toBe('function')
  })

  test('should return an object when called', () => {
    const result = config('test')
    expect(typeof result).toBe('object')
  })
})
