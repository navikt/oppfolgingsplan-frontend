import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { NextApiResponseOppfolgingsplanSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import { getOppfolgingsplanerSM } from "server/service/oppfolgingsplanService";
import { handleSchemaParsingError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";

export const fetchOppfolgingsplanerSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.oppfolgingsplaner = activeMockSM.oppfolgingsplaner;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const oppfolgingsplanerResponse = await getOppfolgingsplanerSM(
      oppfolgingsplanTokenX
    );

    if (oppfolgingsplanerResponse.success) {
      res.oppfolgingsplaner = oppfolgingsplanerResponse.data;
    } else {
      handleSchemaParsingError(
        "Sykmeldt",
        "Oppfolgingsplan",
        oppfolgingsplanerResponse.error
      );
    }
  }

  next();
};
