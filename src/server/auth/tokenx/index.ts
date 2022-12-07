import { ApiErrorException, generalError } from "api/axios/errors";
import { grant } from "./tokenx.grant";
import { logger } from "@navikt/next-logger";

export async function getTokenX(
  subjectToken: string,
  audience: string
): Promise<string> {
  let tokenX;

  try {
    tokenX = await grant(subjectToken, audience);
  } catch (e) {
    logger.warn(`Failed grant for client id: ${audience}. Error message: ${e}`);
    throw new ApiErrorException(generalError());
  }

  if (!tokenX.access_token) {
    logger.warn(`Token X missing access token for client id: ${audience}`);
    throw new ApiErrorException(generalError());
  }

  return tokenX.access_token;
}
