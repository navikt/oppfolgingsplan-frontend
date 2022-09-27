import { restdatoTildato } from './dateUtils';

const isDefined = (value) => {
  return value !== undefined;
};

export const input2RSTiltak = (tiltak) => {
  const rsTiltak = {};
  if (isDefined(tiltak.tiltaknavn)) {
    rsTiltak.tiltaknavn = tiltak.tiltaknavn;
  }
  if (isDefined(tiltak.beskrivelse)) {
    rsTiltak.beskrivelse = tiltak.beskrivelse;
  }
  if (isDefined(tiltak.tiltakId)) {
    rsTiltak.tiltakId = tiltak.tiltakId;
  }
  if (isDefined(tiltak.gjennomfoering)) {
    rsTiltak.gjennomfoering = tiltak.gjennomfoering;
  }
  if (isDefined(tiltak.beskrivelseIkkeAktuelt)) {
    rsTiltak.beskrivelseIkkeAktuelt = tiltak.beskrivelseIkkeAktuelt;
  }
  if (isDefined(tiltak.status)) {
    rsTiltak.status = tiltak.status;
  }
  if (isDefined(tiltak.fom)) {
    rsTiltak.fom = new Date(tiltak.fom);
  }
  if (isDefined(tiltak.tom)) {
    rsTiltak.tom = new Date(tiltak.tom);
  }
  if (isDefined(tiltak.opprettetAv)) {
    rsTiltak.opprettetAv = tiltak.opprettetAv;
  }

  return rsTiltak;
};

export const konvertDatoTiltak = (dato) => {
  const datum = dato.split('T')[0];
  return datum.split('.').reverse().join('-');
};

export const sorterTiltakEtterNyeste = (tiltakListe) => {
  return [...tiltakListe].sort((t1, t2) => {
    return t2.tiltakId - t1.tiltakId;
  });
};

export const sorterKommentarerEtterOpprettet = (kommentarer) => {
  return [...kommentarer].sort((k1, k2) => {
    return k2.id - k1.id;
  });
};

export const sorterTiltakerEtterStatus = (tiltakListe) => {
  const res = sorterTiltakEtterNyeste(tiltakListe);
  return [...res].sort((t1, t2) => {
    return t1.status.localeCompare(t2.status);
  });
};

export const konvertDatoTiltakMedPunkt = (dato) => {
  return dato.split('-').reverse().join('.');
};

export const getStartDateFromTiltakListe = (tiltakList) => {
  const tiltakSortedByStartDate = tiltakList
    .filter((tiltak) => {
      return tiltak.fom;
    })
    .sort((t1, t2) => {
      return new Date(t1.fom) - new Date(t2.fom);
    });
  return tiltakSortedByStartDate[0] && restdatoTildato(tiltakSortedByStartDate[0].fom);
};

export const getEndDateFromTiltakListe = (tiltakList) => {
  const tiltakSortedByEndDate = tiltakList
    .filter((tiltak) => {
      return tiltak.tom;
    })
    .sort((t1, t2) => {
      return new Date(t2.tom) - new Date(t1.tom);
    });
  return tiltakSortedByEndDate[0] && restdatoTildato(tiltakSortedByEndDate[0].tom);
};
