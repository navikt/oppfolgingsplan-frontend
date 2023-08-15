import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-react";

// eslint-disable-next-line
declare const window: any;

export const initFaro = (): Faro | null => {
  if (!process.env.NEXT_PUBLIC_TELEMETRY_URL || typeof window === "undefined")
    return null;

  return initializeFaro({
    url: process.env.NEXT_PUBLIC_TELEMETRY_URL,
    app: {
      name: "oppfolgingsplan-frontend",
      version: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT ?? "",
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: false,
      }),
    ],
  });
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
