import { AxiosError } from "axios";
import { logger } from "@navikt/next-logger";

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;
export function cleanPathForMetric(
  value: string | undefined
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export const logApiError = (
  error: AxiosError,
  url: string,
  httpMethod: string
) => {
  const logPrefix = typeof window === "undefined" ? "Backend:" : "Frontend:";

  if (error.code) {
    if (error.code === "401") return;
    logger.error(
      `${logPrefix} ${httpMethod} ${cleanPathForMetric(url)} returned code: ${
        error.code
      }, message: ${error.message}`
    );
  } else {
    logger.error(
      `${logPrefix} ${httpMethod} ${cleanPathForMetric(
        url
      )} returned error message: ${error.message}`
    );
  }
};
