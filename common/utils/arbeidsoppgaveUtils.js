import { KANGJENNOMFOERES } from '../konstanter';

const isDefined = (value) => {
  return value !== undefined;
};

export const input2RSArbeidsoppgave = (arbeidsoppgave) => {
  const rsArbeidsoppgave = {};
  if (isDefined(arbeidsoppgave.arbeidsoppgavenavn)) {
    rsArbeidsoppgave.arbeidsoppgavenavn = arbeidsoppgave.arbeidsoppgavenavn;
  }
  if (isDefined(arbeidsoppgave.arbeidsoppgaveId)) {
    rsArbeidsoppgave.arbeidsoppgaveId = arbeidsoppgave.arbeidsoppgaveId;
  }
  const gjennomfoering = {
    paaAnnetSted: false,
    medMerTid: false,
    medHjelp: false,
  };
  if (isDefined(arbeidsoppgave.gjennomfoeringSvar)) {
    if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.KAN;
    } else if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.TILRETTELEGGING) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.TILRETTELEGGING;
    } else if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN_IKKE) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.KAN_IKKE;
    }
    if (isDefined(arbeidsoppgave.PAA_ANNET_STED)) {
      gjennomfoering.paaAnnetSted = arbeidsoppgave.PAA_ANNET_STED;
    }
    if (isDefined(arbeidsoppgave.MED_MER_TID)) {
      gjennomfoering.medMerTid = arbeidsoppgave.MED_MER_TID;
    }
    if (isDefined(arbeidsoppgave.MED_HJELP)) {
      gjennomfoering.medHjelp = arbeidsoppgave.MED_HJELP;
    }
    if (
      isDefined(arbeidsoppgave.beskrivelse) &&
      arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.TILRETTELEGGING
    ) {
      gjennomfoering.kanBeskrivelse = arbeidsoppgave.beskrivelse;
    }
    if (isDefined(arbeidsoppgave.beskrivelse) && arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN_IKKE) {
      gjennomfoering.kanIkkeBeskrivelse = arbeidsoppgave.beskrivelse;
    }
    rsArbeidsoppgave.gjennomfoering = gjennomfoering;
  }

  return rsArbeidsoppgave;
};

export const toGjennomfoering = (arbeidsoppgave) => {
  const gjennomfoering = {};
  if (isDefined(arbeidsoppgave.gjennomfoeringSvar)) {
    if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.KAN;
    } else if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.TILRETTELEGGING) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.TILRETTELEGGING;
    } else if (arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN_IKKE) {
      gjennomfoering.kanGjennomfoeres = KANGJENNOMFOERES.KAN_IKKE;
    }
    if (isDefined(arbeidsoppgave.PAA_ANNET_STED)) {
      gjennomfoering.paaAnnetSted = arbeidsoppgave.PAA_ANNET_STED;
    }
    if (isDefined(arbeidsoppgave.MED_MER_TID)) {
      gjennomfoering.medMerTid = arbeidsoppgave.MED_MER_TID;
    }
    if (isDefined(arbeidsoppgave.MED_HJELP)) {
      gjennomfoering.medHjelp = arbeidsoppgave.MED_HJELP;
    }
    if (
      isDefined(arbeidsoppgave.beskrivelse) &&
      arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.TILRETTELEGGING
    ) {
      gjennomfoering.kanBeskrivelse = arbeidsoppgave.beskrivelse;
    }
    if (isDefined(arbeidsoppgave.beskrivelse) && arbeidsoppgave.gjennomfoeringSvar === KANGJENNOMFOERES.KAN_IKKE) {
      gjennomfoering.kanIkkeBeskrivelse = arbeidsoppgave.beskrivelse;
    }
  }
  return gjennomfoering;
};

export const finnArbeidsoppgaverIkkeVurdertAvSykmeldt = (arbeidsoppgaver) => {
  return arbeidsoppgaver.filter((arbeidsoppgave) => {
    return !arbeidsoppgave.gjennomfoering;
  });
};

export const finnOppgaverIkkeGodkjenntAvLedere = (arbeidsoppgaver, fnr) => {
  return arbeidsoppgaver.filter((arbeidsoppgave) => {
    return !arbeidsoppgave.godkjentAvArbeidsgiver && arbeidsoppgave.opprettetAv.fnr !== fnr;
  });
};

export const erArbeidsoppgavenOpprettet = (arbeidsoppgaver, lagretArbeidsoppgave) => {
  return (
    arbeidsoppgaver.filter((arbeidsoppgave) => {
      return arbeidsoppgave.arbeidsoppgaveId === lagretArbeidsoppgave.arbeidsoppgaveId;
    }).length > 0
  );
};

export const sorterArbeidsoppgaverEtterOpprettet = (arbeidsoppgaver) => {
  return arbeidsoppgaver.sort((a, b) => {
    return b.arbeidsoppgaveId - a.arbeidsoppgaveId;
  });
};
