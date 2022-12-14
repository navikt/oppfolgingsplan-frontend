import {
  Godkjenning,
  Oppfolgingsplan,
} from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../../pages/api/arbeidsgiver/oppfolgingsplaner";

export const mapGodkjenninger = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMeta
): Godkjenning[] | null => {
  if (oppfolgingsplan.godkjenninger) {
    return oppfolgingsplan.godkjenninger.map((godkjenning) => {
      return {
        ...godkjenning,
        godkjentAv: {
          ...godkjenning.godkjentAv,
          navn: findName(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            godkjenning.godkjentAv.fnr
          ),
        },
      };
    });
  }

  return null;
};
