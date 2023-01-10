import { getNarmesteLedere } from "server/service/oppfolgingsplanService";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

export const fetchNarmesteLedereSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[]
) => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  return await getNarmesteLedere(oppfolgingsplanTokenX, sykmeldtFnr!);
};
