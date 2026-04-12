/**
 * Configuration reader for Node.js applications
 *
 * @param appName - The name of the application to load configuration for
 * @returns The merged configuration object
 */
export default function getConfig(appName: string): Record<string, unknown>
