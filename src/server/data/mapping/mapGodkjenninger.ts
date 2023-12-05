import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { Godkjenning } from "../../../types/oppfolgingsplan";

export const mapGodkjenninger = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): Godkjenning[] => {
  return oppfolgingsplan.godkjenninger.map((godkjenning) => {
    return {
      ...godkjenning,
      godkjentAv: {
        ...godkjenning.godkjentAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          godkjenning.godkjentAv.fnr,
        ),
      },
    };
  });
};
