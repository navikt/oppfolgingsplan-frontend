import {
  ArbeidsOppgaveDTO,
  OppfolgingsplanDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const mapArbeidsoppgaveListe = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): ArbeidsOppgaveDTO[] => {
  return oppfolgingsplan.arbeidsoppgaveListe.map((oppgave) => {
    return {
      ...oppgave,
      opprettetAv: {
        ...oppgave.opprettetAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          oppgave.opprettetAv.fnr,
        ),
      },
      sistEndretAv: {
        ...oppgave.sistEndretAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          oppgave.sistEndretAv.fnr,
        ),
      },
    };
  });
};
