import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { Virksomhet } from "../../../types/oppfolgingsplan";

export const mapVirksomhet = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): Virksomhet => {
  return {
    virksomhetsnummer: oppfolgingsplan.virksomhet.virksomhetsnummer,
    navn:
      oppfolgingplanerMeta.virksomhet.find(
        (v) =>
          v.virksomhetsnummer === oppfolgingsplan.virksomhet?.virksomhetsnummer,
      )?.navn || "",
  };
};
