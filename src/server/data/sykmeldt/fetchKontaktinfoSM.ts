import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { handleSchemaParsingError } from "server/utils/errors";
import { getKontaktinfoSM } from "server/service/oppfolgingsplanService";
import { NextApiResponseOppfolgingsplanSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import { generalError } from "api/axios/errors";

export const fetchKontaktinfoSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  const sykmeldtFnr = res.oppfolgingsplaner.find((plan) => plan)?.arbeidstaker
    .fnr;

  if (!sykmeldtFnr) {
    return generalError(new Error(`No FNR found in oppfolgingsplan`));
  }

  if (isMockBackend) {
    res.kontaktinfo = activeMockSM.kontaktinfo;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const response = await getKontaktinfoSM(oppfolgingsplanTokenX, sykmeldtFnr);

    if (response.success) {
      res.kontaktinfo = response.data;
    } else {
      handleSchemaParsingError("Sykmeldt", "Kontaktinfo", response.error);
    }
  }

  next();
};
