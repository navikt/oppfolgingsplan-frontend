import {
  Arbeidsoppgave,
  Gjennomforing,
  Person,
} from "../../../types/oppfolgingsplan";

export function createPerson(props?: Partial<Person>): Person {
  return {
    navn: "Person Navn",
    fnr: "12345678901",
    stillinger: [],
    ...props,
  };
}

export function createGjennomforing(
  props?: Partial<Gjennomforing>,
): Gjennomforing {
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
  props?: Partial<Arbeidsoppgave>,
): Arbeidsoppgave {
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
