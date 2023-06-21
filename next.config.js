/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  basePath: "/syk/oppfolgingsplaner",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || null,
  output: "standalone",
  productionBrowserSourceMaps: true,
};

module.exports = moduleExports;
