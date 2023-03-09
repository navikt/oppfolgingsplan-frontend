import { accessDeniedError, ApiErrorException } from "../../api/axios/errors";
import { getTokenX } from "../auth/tokenx";
import serverEnv from "../../server/utils/serverEnv";

export const getOppfolgingsplanTokenX = async (
  idportenToken: string | null
): Promise<string> => {
  if (!idportenToken) {
    throw new ApiErrorException(
      accessDeniedError("Invalid idporten token."),
      403
    );
  }

  return await getTokenX(
    idportenToken,
    serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
  );
};

export const getSykmeldingerArbeidsgiverTokenX = async (
  idportenToken: string | null
): Promise<string> => {
  if (!idportenToken) {
    throw new ApiErrorException(
      accessDeniedError("Invalid idporten token."),
      403
    );
  }

  return await getTokenX(
    idportenToken,
    serverEnv.SYKMELDINGER_ARBEIDSGIVER_CLIENT_ID
  );
};
