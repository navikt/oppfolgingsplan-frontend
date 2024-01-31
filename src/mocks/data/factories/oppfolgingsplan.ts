import {
  ArbeidsOppgaveDTO,
  GjennomforingDTO,
  PersonDTO,
} from "../../../schema/oppfolgingsplanSchema";

export function createPerson(props?: Partial<PersonDTO>): PersonDTO {
  return {
    navn: "Person Navn",
    fnr: "12345678901",
    stillinger: [],
    ...props,
  };
}

export function createGjennomforing(
  props?: Partial<GjennomforingDTO>,
): GjennomforingDTO {
  return {
    kanGjennomfoeres: "TILRETTELEGGING",
    paaAnnetSted: false,
    medMerTid: false,
    medHjelp: false,
    kanBeskrivelse: "Kan gjennomfores tekst",
    kanIkkeBeskrivelse: null,
    ...props,
  };
}
export function createArbeidsoppgave(
  props?: Partial<ArbeidsOppgaveDTO>,
): ArbeidsOppgaveDTO {
  return {
    arbeidsoppgaveId: 123,
    arbeidsoppgavenavn: "Arbeidsoppgave navn",
    erVurdertAvSykmeldt: false,
    opprettetDato: "2020-11-08",
    sistEndretDato: "2020-11-08",
    sistEndretAv: createPerson(),
    opprettetAv: createPerson(),
    ...props,
  };
}
