export const basePath = process.env.NEXT_PUBLIC_BASEPATH;

export const dineSykemeldteRoot = (): string => {
  return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_URL || "";
};

export const dittSykefravarRoot = (): string => {
  return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_URL || "";
};
export const displayTestScenarioSelector =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true" ||
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : process.env.NEXT_PUBLIC_BASEPATH ?? "";
