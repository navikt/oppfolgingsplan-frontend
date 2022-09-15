import serverLogger from "@/server/utils/serverLogger";
import { ApiErrorException, generalError } from "@/common/api/axios/errors";
import { grant } from "./tokenx.grant";

export async function getTokenX(
  subjectToken: string,
  audience: string
): Promise<string> {
  let tokenX;

  try {
    tokenX = await grant(subjectToken, audience);
  } catch (e) {
    serverLogger.error(
      `Failed grant for client id: ${audience}. Error message: ${e}`
    );
    throw new ApiErrorException(generalError(new Error("Failed grant")));
  }

  if (!tokenX.access_token) {
    serverLogger.error(
      `Token X missing access token for client id: ${audience}`
    );
    throw new ApiErrorException(generalError(new Error("Failed grant")));
  }

  return tokenX.access_token;
}
