import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { getVirksomhetSM } from "@/server/service/oppfolgingsplanService";
import {
  handleQueryParamError,
  handleSchemaParsingError,
} from "@/server/utils/errors";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { NextApiResponseVirksomhetSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseVirksomhetSM";

export const fetchVirksomhetSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseVirksomhetSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.virksomhet = activeMockSM.virksomhet;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
    const { virksomhetsnummer } = req.query;

    if (typeof virksomhetsnummer !== "string") {
      return handleQueryParamError(virksomhetsnummer);
    }

    const response = await getVirksomhetSM(
      oppfolgingsplanTokenX,
      virksomhetsnummer
    );

    if (response.success) {
      res.virksomhet = response.data;
    } else {
      handleSchemaParsingError("Sykmeldt", "Virksomhet", response.error);
    }
  }

  next();
};
