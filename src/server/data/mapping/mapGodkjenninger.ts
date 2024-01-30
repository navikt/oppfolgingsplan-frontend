import {
  GodkjenningDTO,
  OppfolgingsplanDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { findName } from "./findName";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const mapGodkjenninger = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): GodkjenningDTO[] => {
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
