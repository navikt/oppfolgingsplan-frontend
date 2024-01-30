import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const mapVirksomhet = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): VirksomhetDTO => {
  return {
    virksomhetsnummer: oppfolgingsplan.virksomhet.virksomhetsnummer,
    navn:
      oppfolgingplanerMeta.virksomhet.find(
        (v) =>
          v.virksomhetsnummer === oppfolgingsplan.virksomhet?.virksomhetsnummer,
      )?.navn || "",
  };
};
