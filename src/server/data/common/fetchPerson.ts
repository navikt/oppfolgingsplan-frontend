import { getPersonSM } from "server/service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "api/axios/errors";
import { Oppfolgingsplan, Person } from "../../../schema/oppfolgingsplanSchema";

export const fetchPerson = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
): Promise<Person> | never => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    throw new ApiErrorException(
      generalError("fetchPersonSM: No FNR found in oppfolgingsplan")
    );
  }

  return await getPersonSM(oppfolgingsplanTokenX, sykmeldtFnr);
};
