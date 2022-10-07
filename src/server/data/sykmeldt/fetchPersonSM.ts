import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getPersonSM } from "@/server/service/oppfolgingsplanService";
import { NextApiResponseOppfolgingsplanSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import { generalError } from "@/common/api/axios/errors";
import serverLogger from "@/server/utils/serverLogger";

export const fetchPersonSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  const sykmeldtFnr = res.oppfolgingsplaner.find((plan) => plan)?.arbeidstaker
    .fnr;

  serverLogger.info(`Fetch person sykmeldt fnr: ${sykmeldtFnr}`);

  if (!sykmeldtFnr) {
    return generalError(new Error(`No FNR found in oppfolgingsplan`));
  }

  if (isMockBackend) {
    res.person = activeMockSM.person;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const response = await getPersonSM(oppfolgingsplanTokenX, sykmeldtFnr);

    serverLogger.info(`Fetch person etter response`);

    if (response.success) {
      res.person = response.data;
    } else {
      handleSchemaParsingError("Sykmeldt", "Person", response.error);
    }
  }

  next();
};
