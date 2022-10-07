import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import { getVirksomhetSM } from "@/server/service/oppfolgingsplanService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { NextApiResponseOppfolgingsplanSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import {
  Oppfolgingsplan,
  Virksomhet,
} from "../../../schema/oppfolgingsplanSchema";
import serverLogger from "@/server/utils/serverLogger";

const findAllVirksomhetsnummer = (oppfolgingsplaner: Oppfolgingsplan[]) => {
  const virksomhetsNummer = oppfolgingsplaner
    ?.filter((plan) => plan.virksomhet)
    ?.filter((plan) => plan.virksomhet!!.virksomhetsnummer)
    .map((plan) => plan.virksomhet!!.virksomhetsnummer);

  return [...new Set(virksomhetsNummer)];
};

const fetchSingleVirksomhet = async (
  oppfolgingsplanTokenX: string,
  virksomhetsnummer: string
) => {
  const response = await getVirksomhetSM(
    oppfolgingsplanTokenX,
    virksomhetsnummer
  );

  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Sykmeldt", "Virksomhet", response.error);
  }
};

export const fetchVirksomhetSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanSM,
  next: () => void
) => {
  if (isMockBackend) {
    res.virksomhet = activeMockSM.virksomhet;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
    const alleVirksomhetsnummer = findAllVirksomhetsnummer(
      res.oppfolgingsplaner
    );

    serverLogger.info(alleVirksomhetsnummer);

    if (!alleVirksomhetsnummer) {
      serverLogger.info("Hent oppfølgingsplaner: ingen virksomhetsnummer");
      return next();
    }

    const virksomhetPromises: any[] = [];

    alleVirksomhetsnummer.forEach((virksomhetsnummer) => {
      if (virksomhetsnummer) {
        const virksomhet = fetchSingleVirksomhet(
          oppfolgingsplanTokenX,
          virksomhetsnummer
        );
        virksomhetPromises.push(virksomhet);
      }
    });

    res.virksomhet = await Promise.all(virksomhetPromises);
  }

  next();
};
