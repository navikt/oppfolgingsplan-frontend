import { getPersonSM } from "server/service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "api/axios/errors";
import { Oppfolgingsplan, Person } from "../../../schema/oppfolgingsplanSchema";
import { logger } from "@navikt/next-logger";

export const fetchPersonSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
): Promise<Person> | never => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    logger.error("fetchPersonSM: No FNR found in oppfolgingsplan");
    throw new ApiErrorException(generalError(new Error()));
  }

  return await getPersonSM(oppfolgingsplanTokenX, sykmeldtFnr);
};
