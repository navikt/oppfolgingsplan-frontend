import {
  createDateMonthsAgo,
  createDateMonthsFromNow,
} from "../../../../../utils/dateUtils";
import { SykmeldingDTO } from "../../../../../schema/sykmeldingSchema";

export const defaultSykmeldingerMockData: SykmeldingDTO[] = [
  {
    id: "b341e1af-6a0d-4740-b8d9-eb3c5551fbc2",
    fnr: "12345678910",
    sykmeldingsperioder: [
      {
        fom: createDateMonthsAgo(4).toString(),
        tom: createDateMonthsFromNow(4).toString(),
      },
    ],
    organisasjonsinformasjon: {
      orgnummer: "110110110",
      orgNavn: "Hogwarts School of Witchcraft and Wizardry",
    },
  },
  {
    id: "31ac2ac8-aa31-4f5f-8bda-fd199aa7d8f4",
    fnr: "12345678910",
    sykmeldingsperioder: [
      {
        fom: createDateMonthsAgo(4).toString(),
        tom: createDateMonthsFromNow(4).toString(),
      },
    ],
    organisasjonsinformasjon: {
      orgnummer: "123456789",
      orgNavn: "Skogen Barnehave",
    },
  },
];
