import { NarmesteLeder } from "../../../../../schema/narmestelederSchema";

export const defaultNarmesteLedereMockData: NarmesteLeder[] = [
  {
    navn: "Albus Dumbledore",
    fnr: "11011011011",
    epost: "albus@hogwarts.ac.uk",
    tlf: "110",
    sistInnlogget: null,
    samtykke: null,
    virksomhetsnummer: "110110110",
    erAktiv: true,
    aktivFom: "2018-10-18T12:00:00+02:00",
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
    aktivFom: "2018-10-18T12:00:00+02:00",
    aktivTom: null,
  },
];
