import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { getNarmesteLedere } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import {
  handleQueryParamError,
  handleSchemaParsingError,
} from "server/utils/errors";
import { NextApiResponseNarmesteLedereSM } from "server/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";

export const fetchNarmesteLedereExternalSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseNarmesteLedereSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.narmesteLedere = activeMockSM.narmesteLedere;
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

    if (narmesteLedereResponse.success) {
      res.narmesteLedere = narmesteLedereResponse.data;
    } else {
      handleSchemaParsingError(
        "Sykmeldt",
        "NarmesteLedere",
        narmesteLedereResponse.error
      );
    }
  }

  next();
};
