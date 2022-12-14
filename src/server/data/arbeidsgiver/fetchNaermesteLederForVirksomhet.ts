import { getNarmesteLeder } from "../../service/oppfolgingsplanService";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

export const fetchNaermesteLederForVirksomhet = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: Oppfolgingsplan[]
) => {
  return await getNarmesteLeder(
    oppfolgingsplanTokenX,
    oppfolgingsplaner[0].arbeidstaker.fnr!!,
    oppfolgingsplaner[0].virksomhet!!.virksomhetsnummer!!
  );
};
