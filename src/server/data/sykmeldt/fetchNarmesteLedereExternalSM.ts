import { isMockBackend } from "environments/publicEnv";
import { getNarmesteLedere } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { handleQueryParamError } from "server/utils/errors";
import { NextApiResponseNarmesteLedereSM } from "server/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";
import getMockDb from "../mock/getMockDb";

export const fetchNarmesteLedereExternalSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseNarmesteLedereSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.narmesteLedere = getMockDb().narmesteLedere;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    const { sykmeldtFnr } = req.query;

    if (typeof sykmeldtFnr !== "string") {
      return handleQueryParamError(sykmeldtFnr);
    }

    const narmesteLedereResponse = await getNarmesteLedere(
      oppfolgingsplanTokenX,
      sykmeldtFnr!!
    );

    res.narmesteLedere = narmesteLedereResponse;
  }

  next();
};
