import {
  Godkjenning,
  Oppfolgingsplan,
} from "../../../schema/oppfolgingsplanSchema";
import { findNameSM } from "./findNameSM";
import { OppfolgingsplanMetaSM } from "../sykmeldt/fetchOppfolgingsplanerMetaSM";

export const mapGodkjenningerSM = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMetaSM
): Godkjenning[] | null => {
  if (oppfolgingsplan.godkjenninger) {
    return oppfolgingsplan.godkjenninger.map((godkjenning) => {
      return {
        ...godkjenning,
        godkjentAv: {
          ...godkjenning.godkjentAv,
          navn: findNameSM(
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
