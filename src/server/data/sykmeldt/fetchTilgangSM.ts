import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { NextApiResponseTilgangSM } from "server/types/next/oppfolgingsplan/NextApiResponseTilgangSM";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import {
  handleQueryParamError,
  handleSchemaParsingError,
} from "server/utils/errors";
import { getTilgangSM } from "server/service/oppfolgingsplanService";

export const fetchTilgangSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseTilgangSM,
  next: () => void
) => {
  const { sykmeldtFnr } = req.query;

  if (typeof sykmeldtFnr !== "string") {
    return handleQueryParamError(sykmeldtFnr);
  }

  if (isMockBackend) {
    res.tilgang = activeMockSM.tilgang;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    const tilgangResponse = await getTilgangSM(
      oppfolgingsplanTokenX,
      sykmeldtFnr
    );

    if (tilgangResponse.success) {
      res.tilgang = tilgangResponse.data;
    } else {
      handleSchemaParsingError("Sykmeldt", "Tilgang", tilgangResponse.error);
    }
  }

  next();
};
