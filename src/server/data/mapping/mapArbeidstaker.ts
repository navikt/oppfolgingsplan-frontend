import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";

export const mapArbeidstaker = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMeta
) => {
  return {
    ...oppfolgingsplan.arbeidstaker,
    navn: oppfolgingplanerMeta.person.navn,
    epost: oppfolgingplanerMeta.kontaktinfo.epost,
    tlf: oppfolgingplanerMeta.kontaktinfo.tlf,
    stillinger: oppfolgingplanerMeta.stillinger
      .filter(
        (stilling) =>
          stilling.virksomhetsnummer ===
          oppfolgingsplan.virksomhet?.virksomhetsnummer
      )
      .filter((stilling) => {
        return (
          !!stilling.fom &&
          new Date(stilling.fom) < new Date(oppfolgingsplan.opprettetDato)
        );
      }),
  };
};
