import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import {
  handleQueryParamError,
  handleSchemaParsingError,
} from "@/server/utils/errors";
import { getPersonSM } from "@/server/service/oppfolgingsplanService";
import { NextApiResponsePersonSM } from "@/server/types/next/oppfolgingsplan/NextApiResponsePersonSM";

export const fetchPersonSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponsePersonSM,
  next: () => void
) => {
  const { sykmeldtFnr } = req.query;

  if (typeof sykmeldtFnr !== "string") {
    return handleQueryParamError(sykmeldtFnr);
  }

  if (isMockBackend) {
    res.person = activeMockSM.person;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const tilgangResponse = await getPersonSM(
      oppfolgingsplanTokenX,
      sykmeldtFnr
    );

    if (tilgangResponse.success) {
      res.person = tilgangResponse.data;
    } else {
      handleSchemaParsingError("Sykmeldt", "Person", tilgangResponse.error);
    }
  }

  next();
};
