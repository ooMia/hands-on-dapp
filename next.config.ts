import fs from "fs";
import { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// @see https://github.com/actions/configure-pages/blob/v5/src/set-pages-config.js
const ghPagesConfig: NextConfig = {
  output: "export",
  basePath: `/${JSON.parse(fs.readFileSync("package.json", "utf-8")).name}`,
};

export default (
  phase: string,
  { defaultConfig }: { defaultConfig: NextConfig },
) => {
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
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    // overwrite ghPagesConfig into nextConfig
    Object.assign(nextConfig, ghPagesConfig);
  }
  return nextConfig;
};
