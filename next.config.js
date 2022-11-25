/** @type {import('next').NextConfig} */

const basePath = "/syk/oppfolgingsplaner";

const moduleExports = {
  reactStrictMode: true,
  basePath,
  publicRuntimeConfig: {
    dineSykemeldteRoot: process.env.DINE_SYKMELDTE_ROOT,
    dittSykefravarRoot: process.env.DITT_SYKEFRAVAER_ROOT,
    displayTestScenarioSelector: process.env.DISPLAY_TESTSCENARIO_SELECTOR,
    basePath,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  eslint: {
    // TODO: Remove/fix before prod
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = moduleExports;
