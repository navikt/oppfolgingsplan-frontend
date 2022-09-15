import {
  ApiErrorException,
  schemaParsingError,
} from "@/common/api/axios/errors";
import { ZodError } from "zod";
import {Audience} from "@/common/api/hooks/routeHooks";

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
