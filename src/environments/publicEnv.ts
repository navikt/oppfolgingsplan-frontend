import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
export const basePath = publicRuntimeConfig.basePath as string;
export const dineSykemeldteRoot =
  publicRuntimeConfig.dineSykemeldteRoot as string;
export const dittSykefravarRoot =
  publicRuntimeConfig.dittSykefravarRoot as string;
export const displayTestScenarioSelector: boolean =
  publicRuntimeConfig.displayTestScenarioSelector === "true";

export const cdnPublicPath: string | undefined =
  publicRuntimeConfig.cdnPublicPath;
