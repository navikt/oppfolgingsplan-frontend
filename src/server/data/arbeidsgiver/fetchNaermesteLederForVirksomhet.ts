import { getNarmesteLeder } from "../../service/oppfolgingsplanService";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

export const fetchNaermesteLederForVirksomhet = async (
  oppfolgingsplanTokenX: string,
  oppfolgingsplaner: OppfolgingsplanDTO[],
) => {
  return await getNarmesteLeder(
    oppfolgingsplanTokenX,
    oppfolgingsplaner[0].arbeidstaker.fnr,
    oppfolgingsplaner[0].virksomhet.virksomhetsnummer,
  );
};
