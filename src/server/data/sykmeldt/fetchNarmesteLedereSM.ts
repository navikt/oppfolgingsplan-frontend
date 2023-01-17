import { getNarmesteLedere } from "server/service/oppfolgingsplanService";

export const fetchNarmesteLedereSM = async (
  oppfolgingsplanTokenX: string,
  sykmeldtFnr: string
) => {
  return await getNarmesteLedere(oppfolgingsplanTokenX, sykmeldtFnr);
};
