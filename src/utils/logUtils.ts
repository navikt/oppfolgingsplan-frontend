import { logFaroErrorMessage } from "../faro/initFaro";
import { logger } from "@navikt/next-logger";

export const logError = (message: string) => {
  if (typeof window !== "undefined") {
    logFaroErrorMessage(message);
  } else {
    logger.error(message);
  }
};
