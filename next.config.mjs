/**
 * This file should follow a few conventions to work with GitHub actions/configure-pages:
 * 1. Only js, cjs, and mjs extensions are supported.
 *    See: https://github.com/actions/configure-pages/blob/main/src/set-pages-config.js#L7
 * 2. Only 10 cases of configuration initialization styles are supported.
 *    See: https://github.com/actions/configure-pages/blob/main/src/config-parser.js#L71
 */

import "dotenv/config";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    reactRemoveProperties: true,
  },
  experimental: {},
};

if (process.env.NODE_ENV === "development") {
  nextConfig.compiler.removeConsole = false;
  nextConfig.experimental.allowDevelopmentBuild = true;

  if (process.env.CI === "true") {
    nextConfig.output = "export";
  }
}

export default nextConfig;
