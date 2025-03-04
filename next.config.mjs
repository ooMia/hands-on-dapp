import "dotenv/config";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { readFileSync } from "node:fs";

// @see https://github.com/actions/configure-pages/blob/v5/src/set-pages-config.js
/**
 * @type {import('next').NextConfig}
 */
const ghPagesConfig = {
  output: "export",
  basePath: `/${JSON.parse(readFileSync("package.json", "utf-8")).name}`,
};

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    ...defaultConfig,
    env: {
      NEXT_PHASE: phase,
    },
    compiler: {
      reactRemoveProperties: true,
    },
  };
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    Object.assign(nextConfig.compiler, {
      removeConsole: {
        exclude: ["error"],
      },
    });
  }
  if (process.env.CI === "true") {
    Object.assign(nextConfig, ghPagesConfig);
  }
  return nextConfig;
};
