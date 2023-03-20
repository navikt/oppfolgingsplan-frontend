/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/oppfolgingsplaner",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  pageExtensions: ["!.cy.ts(x)"],
};

module.exports = moduleExports;
