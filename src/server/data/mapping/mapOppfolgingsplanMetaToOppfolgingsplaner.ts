import { mapVirksomhet } from "./mapVirksomhet";
import { mapGodkjenninger } from "./mapGodkjenninger";
import { mapArbeidsoppgaveListe } from "./mapArbeidsoppgaveListe";
import { mapTiltakListe } from "./mapTiltakListe";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { findName } from "./findName";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { capitalizeEachWord } from "../../../utils/textContextUtils";

export const mapOppfolgingsplanMetaToOppfolgingsplaner = (
  oppfolgingplanerMeta?: OppfolgingsplanMeta,
): OppfolgingsplanDTO[] => {
  if (!oppfolgingplanerMeta?.oppfolgingsplaner) {
    return [];
  }
  return oppfolgingplanerMeta.oppfolgingsplaner.map((oppfolgingsplan) => {
    return {
      ...oppfolgingsplan,
      virksomhet: mapVirksomhet(oppfolgingsplan, oppfolgingplanerMeta),
      godkjenninger: mapGodkjenninger(oppfolgingsplan, oppfolgingplanerMeta),
      arbeidsoppgaveListe: mapArbeidsoppgaveListe(
        oppfolgingsplan,
        oppfolgingplanerMeta,
      ),
      tiltakListe: mapTiltakListe(oppfolgingsplan, oppfolgingplanerMeta),
      arbeidsgiver: {
        naermesteLeder: oppfolgingplanerMeta.narmesteLedere.find((leder) => {
          return (
            leder.virksomhetsnummer ===
              oppfolgingsplan.virksomhet.virksomhetsnummer && leder.erAktiv
          );
        }),
      },
      arbeidstaker: {
        ...oppfolgingsplan.arbeidstaker,
        navn: capitalizeEachWord(oppfolgingplanerMeta.person.navn),
        epost: oppfolgingplanerMeta.kontaktinfo.epost,
        tlf: oppfolgingplanerMeta.kontaktinfo.tlf,
      },
      sistEndretAv: {
        ...oppfolgingsplan.sistEndretAv,
        navn: findName(
          oppfolgingplanerMeta.narmesteLedere,
          oppfolgingplanerMeta.person,
          oppfolgingsplan.sistEndretAv.fnr,
        ),
      },
      skalHaVarsel: oppfolgingplanerMeta?.kontaktinfo?.skalHaVarsel,
    };
  });
};
