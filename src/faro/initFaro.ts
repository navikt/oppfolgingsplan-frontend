import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
  LogLevel,
} from "@grafana/faro-web-sdk";

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
  console.log("Før: Logger feil til faro..");
  if (typeof window !== "undefined" && !!window.faro) {
    console.log("Logger feil til faro..");
    window.faro.api.pushError(err);
  }
};

export function pinoLevelToFaroLevel(pinoLevel: string): LogLevel {
  switch (pinoLevel) {
    case "trace":
      return LogLevel.TRACE;
    case "debug":
      return LogLevel.DEBUG;
    case "info":
      return LogLevel.INFO;
    case "warn":
      return LogLevel.WARN;
    case "error":
      return LogLevel.ERROR;
    default:
      throw new Error(`Unknown level: ${pinoLevel}`);
  }
}
