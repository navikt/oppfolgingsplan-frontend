import {
  Arbeidsoppgave,
  Oppfolgingsplan,
} from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../../pages/api/arbeidsgiver/oppfolgingsplaner";

export const mapArbeidsoppgaveListe = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMeta
): Arbeidsoppgave[] | null => {
  if (oppfolgingsplan.arbeidsoppgaveListe) {
    return oppfolgingsplan.arbeidsoppgaveListe.map((oppgave) => {
      return {
        ...oppgave,
        opprettetAv: {
          ...oppgave.opprettetAv,
          navn: findName(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            oppgave.opprettetAv.fnr
          ),
        },
        sistEndretAv: {
          ...oppgave.sistEndretAv,
          navn: findName(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            oppgave.sistEndretAv.fnr
          ),
        },
      };
    });
  }
  return null;
};
