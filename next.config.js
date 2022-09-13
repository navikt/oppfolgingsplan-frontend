/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const basePath = "/syk/oppfolgingsplaner";

const moduleExports = {
  reactStrictMode: true,
  basePath,
  publicRuntimeConfig: {
    dineSykemeldteRoot: process.env.DINE_SYKMELDTE_ROOT,
    dittSykefravarRoot: process.env.DITT_SYKEFRAVAER_ROOT,
    basePath,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);