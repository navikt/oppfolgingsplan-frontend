import { maanedListe } from "../konstanter";

export const erGyldigDatoformat = (dato: string) => {
  const d = dato.replace(/\./g, "");
  let s = `${parseInt(d, 10)}`;
  if (dato.startsWith("0")) {
    s = `0${s}`;
  } else if (dato.trim().length !== 10) {
    return false;
  } else if (s.length !== 8) {
    return false;
  }
  return true;
};

export const erGyldigDato = (dato: string) => {
  /* eslint-disable max-len */
  const re =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  /* eslint-enable max-len */
  if (!re.test(dato)) {
    return false;
  }
  return erGyldigDatoformat(dato);
};

export const erGyldigDatoIFortiden = (dato: string) => {
  const oppgittDato = new Date(dato);
  const dagensDatoStart = new Date(new Date().setHours(0, 0, 0, 0));
  return oppgittDato.getTime() < dagensDatoStart.getTime();
};

export const toDateMedMaanedNavn = (dato: string) => {
  const nyDato = new Date(dato);
  const dag = nyDato.getDate();
  const maaned = maanedListe[nyDato.getMonth()];
  const aar = nyDato.getFullYear();
  return `${dag}. ${maaned} ${aar}`;
};

export const restdatoTildato = (dato: string) => {
  const datum = dato.split("T")[0];
  return datum.split("-").reverse().join(".");
};

const parsedato = (dato: string) => {
  const datoSplit = dato.split(".");
  let ar = datoSplit[2];
  if (ar.length === 2) {
    ar = `20${ar}`;
  }
  return `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
};

export const fraInputdatoTilJSDato = (inputDato: string) => {
  const d = parsedato(inputDato);
  return new Date(d);
};

export const sluttDatoSenereEnnStartDato = (start: string, slutt: string) => {
  const startDato = fraInputdatoTilJSDato(start);
  const sluttDato = fraInputdatoTilJSDato(slutt);
  return startDato.getTime() < sluttDato.getTime();
};

export const toDate = (dato: string) => {
  if (typeof dato === "undefined" || dato === null) {
    return null;
  } else if (dato.includes("T") && !dato.includes("Z")) {
    return new Date(`${dato}Z`);
  }
  return new Date(dato);
};

export const toDatePrettyPrint = (dato: string) => {
  if (typeof dato === "undefined" || dato === null) {
    return null;
  }

  const _dato = toDate(dato);

  if (!_dato) return "";

  const days =
    _dato.getUTCDate() < 10
      ? `0${_dato.getUTCDate()}`
      : `${_dato.getUTCDate()}`;
  const months =
    _dato.getUTCMonth() + 1 < 10
      ? `0${_dato.getUTCMonth() + 1}`
      : `${_dato.getUTCMonth() + 1}`;
  const years = _dato.getUTCFullYear();

  return `${days}.${months}.${years}`;
};

export function createDateMonthsFromNow(months: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date;
}

export function createDateMonthsAgo(months: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);

  return date;
}

export const getFullDateFormat = (date: string | number | Date) => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return dateObject.toLocaleString("nb-NO", options);
};
