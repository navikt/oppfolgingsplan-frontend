import {
  OppfolgingsplanDTO,
  TiltakDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const mapTiltakListe = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): TiltakDTO[] => {
  return oppfolgingsplan.tiltakListe.map((tiltak) => {
    return {
      ...tiltak,
      opprettetAv: {
        ...tiltak.opprettetAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          tiltak.opprettetAv.fnr,
        ),
      },
      sistEndretAv: {
        ...tiltak.sistEndretAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          tiltak.sistEndretAv.fnr,
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
                kommentar.opprettetAv.fnr,
              ),
            },
            sistEndretAv: {
              ...kommentar.sistEndretAv,
              navn: findName(
                oppfolgingplanerMeta.narmesteLedere,
                oppfolgingplanerMeta.person,
                kommentar.sistEndretAv.fnr,
              ),
            },
          };
        }),
    };
  });
};
