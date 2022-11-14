import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const isOpplaering: boolean = process.env["OPPLAERING"] === "true";
export const isMockBackend: boolean = process.env["MOCK_BACKEND"] === "true";
export const displayTestScenarioSelector: boolean =
  process.env["NEXT_PUBLIC_DISPLAY_TESTSCENARIO_SELECTOR"] === "true";
export const environment: string = process.env["ENVIRONMENT"] as string;
export const basePath = publicRuntimeConfig.basePath as string;
export const dineSykemeldteRoot =
  publicRuntimeConfig.dineSykemeldteRoot as string;
export const dittSykefravarRoot =
  publicRuntimeConfig.dittSykefravarRoot as string;
