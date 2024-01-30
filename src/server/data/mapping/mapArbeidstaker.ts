import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { Person } from "../../../types/oppfolgingsplan";

export const mapArbeidstaker = (
  oppfolgingsplan: OppfolgingsplanDTO,
  oppfolgingplanerMeta: OppfolgingsplanMeta,
): Person => {
  return {
    ...oppfolgingsplan.arbeidstaker,
    navn: oppfolgingplanerMeta.person.navn,
    epost: oppfolgingplanerMeta.kontaktinfo.epost,
    tlf: oppfolgingplanerMeta.kontaktinfo.tlf,
  };
};
