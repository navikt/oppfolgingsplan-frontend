import { getKontaktinfoSM } from "server/service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "api/axios/errors";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

export const fetchKontaktinfoSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    throw new ApiErrorException(
      generalError("fetchKontaktinfoSM: No FNR found in oppfolgingsplan")
    );
  }

  return await getKontaktinfoSM(oppfolgingsplanTokenX, sykmeldtFnr);
};
