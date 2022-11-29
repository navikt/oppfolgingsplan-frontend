/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/oppfolgingsplaner",
  publicRuntimeConfig: {
    dineSykemeldteRoot: process.env.DINE_SYKMELDTE_ROOT,
    dittSykefravarRoot: process.env.DITT_SYKEFRAVAER_ROOT,
    displayTestScenarioSelector: process.env.DISPLAY_TESTSCENARIO_SELECTOR,
    basePath: "/syk/oppfolgingsplaner",
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

module.exports = moduleExports;
