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
    removeConsole: {
      exclude: ["error"],
    },
  },
  experimental: {},
};

if (process.env.NODE_ENV === "development") {
  nextConfig.experimental.allowDevelopmentBuild = true;
}

if (process.env.CI === "true") {
  nextConfig.output = "export";
}

if (process.env.NODE_ENV !== "production") {
  console.table(
    Object.entries(process.env).map(([key, value]) => [
      key,
      value.slice(0, 50),
    ]),
  );

  nextConfig.compiler.removeConsole = false;
}

export default nextConfig;
