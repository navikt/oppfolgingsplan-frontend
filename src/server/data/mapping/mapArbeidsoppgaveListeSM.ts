import {
  Arbeidsoppgave,
  Oppfolgingsplan,
} from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMetaSM } from "../sykmeldt/fetchOppfolgingsplanerMetaSM";
import { findNameSM } from "./findNameSM";

export const mapArbeidsoppgaveListeSM = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMetaSM
): Arbeidsoppgave[] | null => {
  if (oppfolgingsplan.arbeidsoppgaveListe) {
    return oppfolgingsplan.arbeidsoppgaveListe.map((oppgave) => {
      return {
        ...oppgave,
        opprettetAv: {
          ...oppgave.opprettetAv,
          navn: findNameSM(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            oppgave.opprettetAv.fnr
          ),
        },
        sistEndretAv: {
          ...oppgave.sistEndretAv,
          navn: findNameSM(
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
