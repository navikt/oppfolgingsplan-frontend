export const basePath = process.env.NEXT_PUBLIC_BASEPATH;

const devOrigin = "https://www-gcp.dev.nav.no";
const demoOrigin = "https://oppfolgingsplaner.labs.nais.io";

export const isDemo = () => {
  if (typeof window !== "undefined") {
    return window.location.origin === demoOrigin;
  }

  return process.env.RUNTIME_ENVIRONMENT === "demo";
};

export const isDev = () => {
  if (typeof window !== "undefined") {
    return window.location.origin === devOrigin;
  }

  return process.env.RUNTIME_ENVIRONMENT === "dev";
};

export const dineSykemeldteRoot = (): string => {
  if (isDemo()) {
    return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_DEMO_URL || "";
  }

  if (isDev()) {
    return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_DEV_URL || "";
  }

  return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_URL || "";
};

export const dittSykefravarRoot = (): string => {
  if (isDemo()) {
    return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_DEMO_URL || "";
  }

  if (isDev()) {
    return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_DEV_URL || "";
  }

  return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL || "";
};
export const displayTestScenarioSelector =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true" || isDemo();

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : process.env.NEXT_PUBLIC_BASEPATH ?? "";
