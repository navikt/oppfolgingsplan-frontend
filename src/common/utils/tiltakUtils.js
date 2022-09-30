import { restdatoTildato } from './dateUtils';

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
