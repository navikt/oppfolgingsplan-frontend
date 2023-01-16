import { getPersonSM } from "server/service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "api/axios/errors";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { PersonV3DTO } from "../../../schema/personSchemas";

export const fetchPerson = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[]
): Promise<PersonV3DTO> | never => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    throw new ApiErrorException(
      generalError("fetchPersonSM: No FNR found in oppfolgingsplan")
    );
  }

  return await getPersonSM(oppfolgingsplanTokenX, sykmeldtFnr);
};
