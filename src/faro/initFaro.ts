import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
  LogLevel,
} from "@grafana/faro-web-sdk";

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
