import { Oppfolgingsplan, Tiltak } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMetaSM } from "../sykmeldt/fetchOppfolgingsplanerMetaSM";
import { findNameSM } from "./findNameSM";

export const mapTiltakListeSM = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMetaSM
): Tiltak[] | null => {
  if (oppfolgingsplan.tiltakListe) {
    return oppfolgingsplan.tiltakListe.map((tiltak) => {
      return {
        ...tiltak,
        opprettetAv: {
          ...tiltak.opprettetAv,
          navn: findNameSM(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            tiltak.opprettetAv.fnr
          ),
        },
        sistEndretAv: {
          ...tiltak.sistEndretAv,
          navn: findNameSM(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            tiltak.sistEndretAv.fnr
          ),
        },
        kommentarer:
          tiltak.kommentarer &&
          tiltak.kommentarer.map((kommentar) => {
            return {
              ...kommentar,
              opprettetAv: {
                ...kommentar.opprettetAv,
                navn: findNameSM(
                  oppfolgingplanerMeta.narmesteLedere,
                  oppfolgingplanerMeta.person,
                  kommentar.opprettetAv.fnr
                ),
              },
              sistEndretAv: {
                ...kommentar.sistEndretAv,
                navn: findNameSM(
                  oppfolgingplanerMeta.narmesteLedere,
                  oppfolgingplanerMeta.person,
                  kommentar.sistEndretAv.fnr
                ),
              },
            };
          }),
      };
    });
  }
  return null;
};
