import {
  ArbeidsgiverDTO,
  OppfolgingsplanDTO,
  PersonDTO,
  VirksomhetDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { NARMESTE_LEDER, VIRKSOMHET } from "../constants";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { sykmeldtPersonDTO } from "../fixtures/personDTO";

export function createVirksomhetDTO(
  props?: Partial<VirksomhetDTO>,
): VirksomhetDTO {
  return {
    navn: VIRKSOMHET.navn,
    virksomhetsnummer: VIRKSOMHET.virksomhetsnummer,
    ...props,
  };
}

export function createNarmesteLederDTO(
  props?: Partial<NarmesteLederDTO>,
): NarmesteLederDTO {
  return {
    virksomhetsnummer: VIRKSOMHET.virksomhetsnummer,
    aktivTom: null,
    navn: NARMESTE_LEDER.navn,
    epost: null,
    tlf: null,
    sistInnlogget: null,
    samtykke: null,
    ...props,
  };
}

export function createArbeidsgiverDTO(
  props?: Partial<ArbeidsgiverDTO>,
): ArbeidsgiverDTO {
  return {
    narmesteLeder: createNarmesteLederDTO(),
    ...props,
  };
}

export function createPersonDTO(props?: Partial<PersonDTO>): PersonDTO {
  return {
    navn: "Person Navn",
    fnr: "12345678901",
    stillinger: [],
    ...props,
  };
}

export const createOppfolgingsplanDTO = (
  props?: Partial<OppfolgingsplanDTO>,
): OppfolgingsplanDTO => {
  return {
    id: 123,
    sistEndretDato: "2020-11-08",
    opprettetDato: "2020-11-08",
    status: "UNDER_ARBEID",
    virksomhet: createVirksomhetDTO(),
    godkjentPlan: null,
    godkjenninger: [],
    arbeidsoppgaveListe: [],
    tiltakListe: [],
    avbruttPlanListe: [],
    arbeidsgiver: createArbeidsgiverDTO(),
    arbeidstaker: sykmeldtPersonDTO,
    sistEndretAv: sykmeldtPersonDTO,
    ...props,
  };
};
