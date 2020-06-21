const exists = require('fs').existsSync
const rc = require('rc')

module.exports = (appName) => {
  const root = process.cwd()
  const defaultConfigPath = `${root}/.config/${appName}.json`

  let defaultConfig
  if (exists(defaultConfigPath)) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    defaultConfig = require(defaultConfigPath)
  }

  return rc(appName, defaultConfig)
}
