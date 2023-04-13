import { ApiErrorException, generalError } from "../../api/axios/errors";
import { ZodError } from "zod";
import { Audience } from "../../hooks/routeHooks";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError
): never {
  throw new ApiErrorException(
    generalError(
      `${audience} is unable to parse ${schema}-schema: ${error.toString()}`
    )
  );
}

export const handleQueryParamError = (
  ...params: (string | string[] | undefined)[]
): never => {
  throw new ApiErrorException(
    generalError(`Malformed query params: ${JSON.stringify(params)}`)
  );
};

export const handleRequestBodyError = (
  ...params: (unknown | unknown[] | undefined)[]
): never => {
  throw new ApiErrorException(
    generalError(`Invalid types in request body: ${JSON.stringify(params)}`)
  );
};
