export interface IServerEnvironmentVariables {
  LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  TOKEN_X_WELL_KNOWN_URL: string;
  TOKEN_X_CLIENT_ID: string;
  TOKEN_X_PRIVATE_JWK: string;
  TOKEN_X_AUDIENCE: string;
  IDPORTEN_WELL_KNOWN_URL: string;
  INGRESS: string;
  DECORATOR_ENV: "prod" | "dev";
  MOCK_BACKEND: string;
  IDPORTEN_CLIENT_ID: string;
  SYFOOPPFOLGINGSPLANSERVICE_HOST: string;
  DITT_SYKEFRAVAER_ROOT: string;
  DINE_SYKMELDTE_ROOT: string;
}

// @ts-ignore
const serverEnv = process.env as IServerEnvironmentVariables;

export default serverEnv;
