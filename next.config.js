/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/oppfolgingsplaner",
  assetPrefix: process.env.ASSET_PREFIX,
  publicRuntimeConfig: {
    dineSykemeldteRoot: process.env.DINE_SYKMELDTE_ROOT,
    dittSykefravarRoot: process.env.DITT_SYKEFRAVAER_ROOT,
    displayTestScenarioSelector: process.env.DISPLAY_TESTSCENARIO_SELECTOR,
    basePath: "/syk/oppfolgingsplaner",
    cdnPublicPath: process.env.ASSET_PREFIX
      ? `${process.env.ASSET_PREFIX}/public`
      : "/syk/oppfolgingsplaner" ?? "",
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
};

module.exports = moduleExports;
