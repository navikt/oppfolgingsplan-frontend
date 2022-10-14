import { maanedListe } from "../konstanter";

export const erGyldigDatoIFortiden = (dato: string) => {
  const oppgittDato = new Date(dato);
  const dagensDatoStart = new Date(new Date().setHours(0, 0, 0, 0));
  return oppgittDato.getTime() < dagensDatoStart.getTime();
};

export const toDateMedMaanedNavn = (dato: string | null) => {
  const nyDato = new Date(dato!!);
  const dag = nyDato.getDate();
  const maaned = maanedListe[nyDato.getMonth()];
  const aar = nyDato.getFullYear();

  if (!dag && !maaned && !aar) {
    return "";
  }

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
