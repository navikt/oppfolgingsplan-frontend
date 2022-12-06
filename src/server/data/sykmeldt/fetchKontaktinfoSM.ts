import { getKontaktinfoSM } from "server/service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "api/axios/errors";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { logger } from "@navikt/next-logger";

export const fetchKontaktinfoSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    logger.error("fetchKontaktinfoSM: No FNR found in oppfolgingsplan");
    throw new ApiErrorException(generalError(new Error()));
  }

  return await getKontaktinfoSM(oppfolgingsplanTokenX, sykmeldtFnr);
};
