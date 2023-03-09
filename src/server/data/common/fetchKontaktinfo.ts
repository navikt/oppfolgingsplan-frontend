import { getKontaktinfo } from "../../service/oppfolgingsplanService";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

export const fetchKontaktinfo = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[]
) => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  if (!sykmeldtFnr) {
    throw new ApiErrorException(
      generalError("fetchKontaktinfoSM: No FNR found in oppfolgingsplan")
    );
  }

  return await getKontaktinfo(oppfolgingsplanTokenX, sykmeldtFnr);
};
