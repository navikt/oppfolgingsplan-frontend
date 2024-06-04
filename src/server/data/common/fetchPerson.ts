import { getPerson } from "../../service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { PersonDTO } from "../../../schema/personSchemas";

export const fetchPerson = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[],
): Promise<PersonDTO> | never => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    throw new ApiErrorException(
      generalError("fetchPersonSM: No FNR found in oppfolgingsplan"),
    );
  }

  return await getPerson(oppfolgingsplanTokenX, sykmeldtFnr);
};
