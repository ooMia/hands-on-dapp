import "dotenv/config";
import fs from "fs";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// @see https://github.com/actions/configure-pages/blob/v5/src/set-pages-config.js
const ghPagesConfig = {
  output: "export",
  basePath: `/${JSON.parse(fs.readFileSync("package.json", "utf-8")).name}`,
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
