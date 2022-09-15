import pino, { LoggerOptions } from "pino";

const loggerOptions: LoggerOptions = {
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
  level: "info",
  timestamp: false,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
};

const serverLogger = pino(loggerOptions);

export default serverLogger;
