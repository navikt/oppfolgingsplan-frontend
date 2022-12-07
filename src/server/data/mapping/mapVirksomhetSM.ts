import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMetaSM } from "../sykmeldt/fetchOppfolgingsplanerMetaSM";

export const mapVirksomhetSM = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMetaSM
) => {
  return {
    virksomhetsnummer: oppfolgingsplan.virksomhet?.virksomhetsnummer || null,
    navn:
      oppfolgingplanerMeta.virksomhet.find(
        (v) =>
          v.virksomhetsnummer == oppfolgingsplan.virksomhet?.virksomhetsnummer
      )?.navn || null,
  };
};
