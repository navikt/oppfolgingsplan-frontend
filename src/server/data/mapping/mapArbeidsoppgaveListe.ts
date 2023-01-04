import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { Arbeidsoppgave } from "../../../types/oppfolgingsplan";

export const mapArbeidsoppgaveListe = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta
): Arbeidsoppgave[] => {
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
};
