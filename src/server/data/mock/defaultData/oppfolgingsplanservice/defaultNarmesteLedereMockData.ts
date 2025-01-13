import { NarmesteLederDTO } from "../../../../../schema/narmestelederSchema";
import {
  createDateMonthsAgo,
  createDateMonthsFromNow,
} from "../../../../../utils/dateUtils";

export const defaultNarmesteLedereMockData: NarmesteLederDTO[] = [
  {
    navn: "Jeg er ikke aktiv",
    fnr: "12011011012",
    epost: "ikke@aktiv.no",
    tlf: "111",
    sistInnlogget: null,
    samtykke: null,
    virksomhetsnummer: "110110110",
    erAktiv: false,
    aktivFom: createDateMonthsAgo(12).toISOString(),
    aktivTom: createDateMonthsFromNow(12).toISOString(),
  },
  {
    navn: "Albus Dumbledore",
    fnr: "11011011011",
    epost: "albus@hogwarts.ac.uk",
    tlf: "110",
    sistInnlogget: null,
    samtykke: null,
    virksomhetsnummer: "110110110",
    erAktiv: true,
    aktivFom: createDateMonthsAgo(12).toISOString(),
    aktivTom: null,
  },
  {
    navn: "Mester Kreda",
    fnr: "212110115111",
    epost: "m@k.no",
    tlf: "110",
    sistInnlogget: null,
    samtykke: null,
    virksomhetsnummer: "123456789",
    erAktiv: true,
    aktivFom: createDateMonthsAgo(12).toISOString(),
    aktivTom: null,
  },
];
