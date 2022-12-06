import { ApiErrorException, generalError } from "api/axios/errors";
import { ZodError } from "zod";
import { Audience } from "hooks/routeHooks";
import { logger } from "@navikt/next-logger";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError
): never {
  logger.error(
    `${audience} is unable to parse ${schema}-schema: ${error.toString()}`
  );
  throw new ApiErrorException(generalError());
}

export const handleQueryParamError = (
  ...params: (string | string[] | undefined)[]
): never => {
  logger.error(`Malformed query params: ${JSON.stringify(params)}`);
  throw new ApiErrorException(generalError());
};
