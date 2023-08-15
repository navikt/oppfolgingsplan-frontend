import { AxiosError } from "axios";
import { logError } from "../../utils/logUtils";

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
  if (error.code) {
    logError(
      `${httpMethod} ${cleanPathForMetric(url)} returned code: ${
        error.code
      }, message: ${error.message}`
    );
  } else {
    logError(
      `${httpMethod} ${cleanPathForMetric(url)} returned error message: ${
        error.message
      }`
    );
  }
};
