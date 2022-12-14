import { Oppfolgingsplan, Tiltak } from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../../pages/api/arbeidsgiver/oppfolgingsplaner";

export const mapTiltakListe = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMeta
): Tiltak[] | null => {
  if (oppfolgingsplan.tiltakListe) {
    return oppfolgingsplan.tiltakListe.map((tiltak) => {
      return {
        ...tiltak,
        opprettetAv: {
          ...tiltak.opprettetAv,
          navn: findName(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            tiltak.opprettetAv.fnr
          ),
        },
        sistEndretAv: {
          ...tiltak.sistEndretAv,
          navn: findName(
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
                navn: findName(
                  oppfolgingplanerMeta.narmesteLedere,
                  oppfolgingplanerMeta.person,
                  kommentar.opprettetAv.fnr
                ),
              },
              sistEndretAv: {
                ...kommentar.sistEndretAv,
                navn: findName(
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
