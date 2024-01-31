import { getNarmesteLedere } from "../../service/oppfolgingsplanService";

export const fetchNarmesteLedereSM = async (oppfolgingsplanTokenX: string) => {
  return await getNarmesteLedere(oppfolgingsplanTokenX);
};
