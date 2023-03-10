export const basePath = process.env.NEXT_PUBLIC_BASEPATH;

export const isLabs = () => {
  if (typeof window === "undefined") return "";

  return (
    window.location.origin ===
    process.env.NEXT_PUBLIC_OPPFOLGINGSPLAN_LABS_INGRESS
  );
};

export const dineSykemeldteRoot = (): string => {
  if (typeof window === "undefined") return "";

  if (isLabs()) {
    return process.env.NEXT_PUBLIC_DINE_SYKMELDTE_LABS_URL || "";
  }

  return window.location.origin + process.env.NEXT_PUBLIC_DINE_SYKMELDTE_PATH;
};

export const dittSykefravarRoot = (): string => {
  if (typeof window === "undefined") return "";

  if (isLabs()) {
    return process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_LABS_URL || "";
  }

  return window.location.origin + process.env.NEXT_PUBLIC_DITT_SYKEFRAVAER_PATH;
};
export const displayTestScenarioSelector =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT == "true" || isLabs();

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : process.env.NEXT_PUBLIC_BASEPATH ?? "";
