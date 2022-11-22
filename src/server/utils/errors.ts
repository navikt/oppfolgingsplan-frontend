import {
  ApiErrorException,
  generalError,
  schemaParsingError,
} from "api/axios/errors";
import { ZodError } from "zod";
import { Audience } from "hooks/routeHooks";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError
): never {
  throw new ApiErrorException(
    schemaParsingError(
      new Error(
        `${audience} is unable to parse ${schema}-schema: ${error.toString()}`
      )
    )
  );
}

export const handleQueryParamError = (
  ...params: (string | string[] | undefined)[]
): never => {
  throw new ApiErrorException(
    generalError(new Error(`Malformed query params: ${JSON.stringify(params)}`))
  );
};
