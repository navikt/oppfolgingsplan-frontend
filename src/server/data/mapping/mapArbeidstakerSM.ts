import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanMetaSM } from "../sykmeldt/fetchOppfolgingsplanerMetaSM";

export const mapArbeidstakerSM = (
  oppfolgingsplan: Oppfolgingsplan,
  oppfolgingplanerMeta: OppfolgingsplanMetaSM
) => {
  return {
    ...oppfolgingsplan.arbeidstaker,
    navn: oppfolgingplanerMeta.person.navn,
    epost: oppfolgingplanerMeta.kontaktinfo.epost,
    tlf: oppfolgingplanerMeta.kontaktinfo.tlf,
    stillinger: oppfolgingplanerMeta.stillinger
      .filter(
        (stilling) =>
          stilling.virksomhetsnummer ==
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
