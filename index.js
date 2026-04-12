import { existsSync } from 'fs';
import { readFileSync } from 'fs';
import rc from 'rc';

/**
 * Configuration reader for Node.js applications
 *
 * @param {string} appName - The name of the application to load configuration for
 * @returns {Object} The merged configuration object
 */
export default (appName) => {
  const root = process.cwd();
  const defaultConfigPath = `${root}/.config/${appName}.json`;

  let defaultConfig = {};
  if (existsSync(defaultConfigPath)) {
    try {
      const configContent = readFileSync(defaultConfigPath, 'utf8');
      defaultConfig = JSON.parse(configContent);
    } catch (error) {
      // If config file is invalid, use empty config
      defaultConfig = {};
    }
  }

  return rc(appName, { ...defaultConfig, ...process.env });
};
