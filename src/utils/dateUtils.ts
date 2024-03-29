import { maanedListe } from "../constants/konstanter";
import { format, parseISO } from "date-fns";

const MILLISEKUNDER_PER_DAG = 86400000;

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

  if (!dag && !maaned && !aar) {
    return "";
  }

  return `${dag}. ${maaned} ${aar}`;
};

export const restdatoTildato = (dato: string) => {
  const datum = dato.split("T")[0];
  return datum.split("-").reverse().join(".");
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

export const getTime = (date?: string | null): number => {
  return date ? new Date(date).getTime() : 0;
};

export function leggTilDagerPaDato(date: Date, days: number) {
  const nyDato = new Date(date);
  nyDato.setTime(nyDato.getTime() + days * MILLISEKUNDER_PER_DAG);
  return new Date(nyDato);
}

export function toDate(date: string | Date): Date {
  return typeof date === "string" ? parseISO(date) : date;
}

export const formatAsLocalDateTime = (date: Date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
};

export const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};
