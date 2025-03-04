import "dotenv/config";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

let nextConfig = {};

// @see https://github.com/actions/configure-pages/blob/v5/src/set-pages-config.js
/**
 * @type {import('next').NextConfig}
 */
const ghPagesConfig = {
  ...nextConfig,
  output: "export",
  // basePath: `/${JSON.parse(readFileSync("package.json", "utf-8")).name}`,
  // pageExtensions: ["jsx", "js", "ts", "tsx"],
};

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    ...defaultConfig,
    env: {
      NEXT_PHASE: phase,
    },
    compiler: {
      reactRemoveProperties: true,
    },
  };
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    Object.assign(config.compiler, {
      removeConsole: {
        exclude: ["error"],
      },
    });
  }
  if (process.env.CI === "true") {
    Object.assign(config, ghPagesConfig);
  }
  return config;
};
