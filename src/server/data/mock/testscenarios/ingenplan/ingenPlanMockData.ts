import { defaultNarmesteLedereMockData } from "../../defaultData/oppfolgingsplanservice/defaultNarmesteLedereMockData";
import { OppfolgingsplanDTO } from "../../../../../schema/oppfolgingsplanSchema";

const today = new Date();

export const ingenPlanMockData: OppfolgingsplanDTO[] = [
  {
    id: 1234,
    sistEndretDato: today.toISOString(),
    opprettetDato: today.toISOString(),
    status: "UNDER_ARBEID",
    virksomhet: {
      virksomhetsnummer: "110110110",
      navn: "",
    },
    godkjentPlan: null,
    godkjenninger: [],
    arbeidsoppgaveListe: [],
    tiltakListe: [],
    avbruttPlanListe: [],
    arbeidsgiver: {
      naermesteLeder: {
        navn: "Albus Dumbledore",
        fnr: "11011011011",
        epost: "albus@hogwarts.ac.uk",
        tlf: "110",
        sistInnlogget: "2020-02-24T08:57:46.747",
        samtykke: null,
        virksomhetsnummer: "110110110",
        erAktiv: true,
        aktivFom: "2020-02-24T08:57:46.747",
        aktivTom: null,
      },
    },
    arbeidstaker: {
      navn: "Labben Rekemester",
      fnr: "110110110110",
      epost: null,
      tlf: null,
      sistInnlogget: "2020-02-24T09:34:24.266",
      samtykke: null,
      evaluering: null,
      stillinger: [
        {
          yrke: "Soppkontrollør",
          prosent: 80,
        },
      ],
    },
    sistEndretAv: {
      navn: defaultNarmesteLedereMockData[0].navn,
      fnr: defaultNarmesteLedereMockData[0].fnr!,
      epost: null,
      tlf: null,
      sistInnlogget: null,
      samtykke: null,
      evaluering: null,
      stillinger: [],
    },
  },
];
