import { accessDeniedError, ApiErrorException } from "api/axios/errors";
import { getTokenX } from "server/auth/tokenx";
import serverEnv from "server/utils/serverEnv";
import { logger } from "@navikt/next-logger";

export const getOppfolgingsplanTokenX = async (
  idportenToken: string | null
): Promise<string> => {
  if (!idportenToken) {
    logger.error("Invalid idporten token.");
    throw new ApiErrorException(accessDeniedError());
  }

  return await getTokenX(
    idportenToken,
    serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
  );
};
