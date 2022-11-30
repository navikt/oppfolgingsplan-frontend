import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { NextApiResponseSykmeldingerSM } from "server/types/next/oppfolgingsplan/NextApiResponseSykmeldingerSM";
import { getSykmeldingerSM } from "server/service/oppfolgingsplanService";
import { handleSchemaParsingError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import getMockDb from "../mock/getMockDb";

export const fetchSykmeldingerSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseSykmeldingerSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.sykmeldinger = getMockDb().sykmeldinger;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

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
