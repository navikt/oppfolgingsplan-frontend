import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";
import {createDateMonthsAgo, createDateMonthsFromNow} from "@/common/utils/datoUtils";

export const defaultSykmeldingerMockData: Sykmelding[] = [
    {
        id: 'b341e1af-6a0d-4740-b8d9-eb3c5551fbc2',
        fnr: '12345678910',
        sykmeldingsperioder: [
            {
                fom: createDateMonthsAgo(4).toString(),
                tom: createDateMonthsFromNow(4).toString(),
            },
        ],
        organisasjonsinformasjon: {
            orgnummer: '123456781',
            orgNavn: 'Hogwarts School of Witchcraft and Wizardry',
        },
    },
    {
        id: '31ac2ac8-aa31-4f5f-8bda-fd199aa7d8f4',
        fnr: '12345678910',
        sykmeldingsperioder: [
            {
                fom: new Date('2017-04-15').toString(),
                tom: new Date('2017-04-25').toString(),
            },
        ],
        organisasjonsinformasjon: {
            orgnummer: '123456789',
            orgNavn: 'Skogen Barnehave',
        },
    },
];