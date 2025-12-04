export const basePath = process.env.NEXT_PUBLIC_BASEPATH;

export const minSideRoot = process.env.NEXT_PUBLIC_MIN_SIDE_ROOT as string;

export const nyOppfolgingsplanRoot: string =
  process.env.NEXT_PUBLIC_NY_OPPFOLGINGSPLAN_ROOT ||
  "https://www.nav.no/syk/oppfolgingsplan/sykmeldt";

export const dineSykemeldteRoot = process.env
  .NEXT_PUBLIC_DINE_SYKMELDTE_URL as string;

export const dittSykefravarRoot = process.env
  .NEXT_PUBLIC_DITT_SYKEFRAVAER_URL as string;

export const displayTestScenarioSelector =
  process.env.NEXT_PUBLIC_IS_DEVELOPMENT === "true" ||
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";

export const cdnPublicPath: string | undefined = process.env
  .NEXT_PUBLIC_ASSET_PREFIX
  ? `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/public`
  : (process.env.NEXT_PUBLIC_BASEPATH ?? "");

export const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod";
