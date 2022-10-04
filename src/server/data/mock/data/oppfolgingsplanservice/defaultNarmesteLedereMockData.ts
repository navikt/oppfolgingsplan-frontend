import { NarmesteLedereDTO } from "@/server/service/schema/narmestelederSchema";

export const defaultNarmesteLedereMockData: NarmesteLedereDTO = [
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
];
