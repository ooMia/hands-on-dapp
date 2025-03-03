import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// @ts-check
// TODO: #4 separate export and declaration @ooMia
const base = {
  /**
   * @type {import('next').NextConfig}
   */
  compiler: {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
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
      ...base.compiler,
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    nextConfig.compiler.removeConsole = false;
  }
  return nextConfig;
};
