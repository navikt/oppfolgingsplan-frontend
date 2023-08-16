import { logger } from "@navikt/next-logger";

// eslint-disable-next-line
declare const window: any;

export const logError = (message: string) => {
  if (typeof window !== "undefined") {
    logFaroErrorMessage(message);
  } else {
    logger.error(message);
  }
};

export const logFaroError = (err: Error) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(err);
  }
};

export const logFaroErrorMessage = (message: string) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(new Error(message));
  }
};
