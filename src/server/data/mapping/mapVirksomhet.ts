import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMeta } from "../../../pages/api/arbeidsgiver/oppfolgingsplaner";

export const mapVirksomhet = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMeta
) => {
  return {
    virksomhetsnummer: oppfolgingsplan.virksomhet?.virksomhetsnummer || null,
    navn:
      oppfolgingplanerMeta.virksomhet.find(
        (v) =>
          v.virksomhetsnummer === oppfolgingsplan.virksomhet?.virksomhetsnummer
      )?.navn || null,
  };
};
