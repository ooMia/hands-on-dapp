import "dotenv/config";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/**
 * @type {import('next').NextConfig}
 */
const ci = {
  // @see https://github.com/actions/configure-pages/blob/v5/src/set-pages-config.js
  // output: "export",
  // basePath: `/${JSON.parse(readFileSync("package.json", "utf-8")).name}`,
  // pageExtensions: ["jsx", "js", "ts", "tsx"],
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    reactRemoveProperties: true,
  },
};

export default (phase, { defaultConfig }) => {
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    Object.assign(nextConfig.compiler, {
      removeConsole: {
        exclude: ["error"],
      },
    });
  }

  if (process.env.CI === "true") {
    Object.assign(nextConfig, ci);
  }

  return {
    env: {
      NEXT_PHASE: phase,
    },
    ...defaultConfig,
    ...nextConfig,
  };
};
