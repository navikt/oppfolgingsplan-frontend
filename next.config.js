/** @type {import('next').NextConfig} */

//const { withSentryConfig } = require("@sentry/nextjs");

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

const sentryWebpackPluginOptions = {
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
