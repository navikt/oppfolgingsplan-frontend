import { isMockBackend } from "environments/publicEnv";
import activeMockSM from "server/data/mock/activeMockSM";
import { getNarmesteLedere } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { handleSchemaParsingError } from "server/utils/errors";
import { NextApiResponseOppfolgingsplanSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";

export const fetchNarmesteLedereSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.narmesteLedere = activeMockSM.narmesteLedere;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    const sykmeldtFnr = res.oppfolgingsplaner.find((plan) => plan)?.arbeidstaker
      .fnr;

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
