import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

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
      new TracingInstrumentation(),
    ],
  });
};
