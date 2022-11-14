import { getNarmesteLedere } from "server/service/oppfolgingsplanService";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

export const fetchNarmesteLedereSM = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  const sykmeldtFnr = oppfolgingsplaner.find((plan) => plan)?.arbeidstaker.fnr;

  return await getNarmesteLedere(oppfolgingsplanTokenX, sykmeldtFnr!!);
};
