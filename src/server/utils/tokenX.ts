import { accessDeniedError, ApiErrorException } from "api/axios/errors";
import { getTokenX } from "server/auth/tokenx";
import serverEnv from "server/utils/serverEnv";
import serverLogger from "server/utils/serverLogger";

export const getOppfolgingsplanTokenX = async (
  idportenToken: string | null
): Promise<string> => {
  if (!idportenToken) {
    throw new ApiErrorException(
      accessDeniedError(new Error("Invalid idporten token."))
    );
  }

  const oppfolgingsplanTokenX = await getTokenX(
    idportenToken,
    serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
  );

  serverLogger.info("Exchanging SM tokenx ok");

  return oppfolgingsplanTokenX;
};
