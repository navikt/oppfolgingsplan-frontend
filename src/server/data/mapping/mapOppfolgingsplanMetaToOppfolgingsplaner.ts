import { mapVirksomhet } from "./mapVirksomhet";
import { mapGodkjenninger } from "./mapGodkjenninger";
import { mapArbeidsoppgaveListe } from "./mapArbeidsoppgaveListe";
import { mapTiltakListe } from "./mapTiltakListe";
import { mapArbeidstaker } from "./mapArbeidstaker";
import { OppfolgingsplanMeta } from "../../types/OppfolgingsplanMeta";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { findName } from "./findName";

export const mapOppfolgingsplanMetaToOppfolgingsplaner = (
  oppfolgingplanerMeta: OppfolgingsplanMeta | undefined
): Oppfolgingsplan[] => {
  return (
    oppfolgingplanerMeta?.oppfolgingsplaner.map((oppfolgingsplan) => {
      return {
        id: oppfolgingsplan.id,
        sistEndretDato: oppfolgingsplan.sistEndretDato,
        opprettetDato: oppfolgingsplan.opprettetDato,
        status: oppfolgingsplan.status,
        virksomhet: mapVirksomhet(oppfolgingsplan, oppfolgingplanerMeta),
        godkjentPlan: oppfolgingsplan.godkjentPlan,
        godkjenninger: mapGodkjenninger(oppfolgingsplan, oppfolgingplanerMeta),
        arbeidsoppgaveListe: mapArbeidsoppgaveListe(
          oppfolgingsplan,
          oppfolgingplanerMeta
        ),
        tiltakListe: mapTiltakListe(oppfolgingsplan, oppfolgingplanerMeta),
        avbruttPlanListe: oppfolgingsplan.avbruttPlanListe,
        arbeidsgiver: {
          naermesteLeder: oppfolgingplanerMeta.narmesteLedere.find((leder) => {
            return (
              leder.virksomhetsnummer ===
                oppfolgingsplan.virksomhet.virksomhetsnummer && leder.erAktiv
            );
          }),
        },
        arbeidstaker: mapArbeidstaker(oppfolgingsplan, oppfolgingplanerMeta),
        sistEndretAv: {
          ...oppfolgingsplan.sistEndretAv,
          navn: findName(
            oppfolgingplanerMeta.narmesteLedere,
            oppfolgingplanerMeta.person,
            oppfolgingsplan.sistEndretAv.fnr
          ),
        },
      };
    }) || []
  );
};
