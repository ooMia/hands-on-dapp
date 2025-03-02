import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// @ts-check
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env: {
      NEXT_PHASE: phase,
    },
    compiler: {
      ...defaultConfig.compiler,
      reactRemoveProperties: true,
      removeConsole: {
        exclude: ["error"],
      },
    },
    images: {
      remotePatterns: [
        {
          hostname: "image.yes24.com",
          pathname: "/goods/**",
        },
      ],
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    nextConfig.compiler.removeConsole = false;
  }
  return nextConfig;
};
