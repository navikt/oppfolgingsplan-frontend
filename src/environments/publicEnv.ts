export const basePath = process.env.NEXT_PUBLIC_BASEPATH;

const devOrigin = "https://www-gcp.dev.nav.no";
const demoOrigin = "https://demo.ekstern.dev.nav.no";

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
  return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_URL || "";
};

export const dittSykefravarRoot = (): string => {
  return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL || "";
};
export const displayTestScenarioSelector =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true" || isDemo();

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : process.env.NEXT_PUBLIC_BASEPATH ?? "";
