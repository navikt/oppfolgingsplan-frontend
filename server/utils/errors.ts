import {
  ApiErrorException,
  schemaParsingError,
} from "@/common/api/axios/errors";
import { Audience } from "@/common/hooks/routeHooks";
import { ZodError } from "zod";

export function handleSchemaParsingError(
  audience: Audience,
  schema: string,
  error: ZodError
) {
  throw new ApiErrorException(
    schemaParsingError(
      new Error(
        `${audience} is unable to parse ${schema}-schema: ${error.toString()}`
      )
    )
  );
}
