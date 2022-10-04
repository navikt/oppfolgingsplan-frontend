import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { NextApiResponseSykmeldingerSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseSykmeldingerSM";
import { getSykmeldingerSM } from "@/server/service/oppfolgingsplanService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";

export const fetchSykmeldingerSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSykmeldingerSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.sykmeldinger = activeMockSM.sykmeldinger;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const sykmeldingerResponse = await getSykmeldingerSM(oppfolgingsplanTokenX);

    if (sykmeldingerResponse.success) {
      res.sykmeldinger = sykmeldingerResponse.data;
    } else {
      handleSchemaParsingError(
        "Sykmeldt",
        "Sykmelding",
        sykmeldingerResponse.error
      );
    }
  }

  next();
};
