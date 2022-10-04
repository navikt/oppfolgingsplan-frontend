import {erSykmeldingGyldigForOppfolgingMedGrensedato} from './oppfolgingsdialogUtils';
import {SykmeldingDTO} from "@/server/service/schema/sykmeldingSchema";
import {NarmesteLedereDTO} from "@/server/service/schema/narmestelederSchema";

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer: string, naermesteLedere: NarmesteLedereDTO) => {
    return (
        naermesteLedere.filter((leder) => {
            return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
        }).length > 0
    );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer: string, naermesteLedere: NarmesteLedereDTO) => {
    const naermesteLeder = naermesteLedere.filter((leder) => {
        return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
    })[0];
    return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarIngenSendteSykmeldinger = (sykmeldinger: SykmeldingDTO[]) => {
    return sykmeldinger.length === 0;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger: SykmeldingDTO[]) => {
    const tomGrenseDato = new Date();
    return (
        sykmeldinger
            .filter((sykmelding) => {
                return sykmelding.organisasjonsinformasjon.orgnummer;
            })
            .filter((sykmelding) => {
                return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato);
            }).length > 0
    );
};

export interface ArbeidsgivereForGyldigeSykmeldinger {
    navn: string;
    virksomhetsnummer: string;
    naermesteLeder: string | undefined;
    harNaermesteLeder: boolean
}

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger: SykmeldingDTO[], naermesteLedere: NarmesteLedereDTO): ArbeidsgivereForGyldigeSykmeldinger[] => {
    const dagensDato = new Date();
    return sykmeldinger
        .filter((sykmelding) => {
            return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
        })
        .map((sykmelding) => {
            return {
                virksomhetsnummer: sykmelding.organisasjonsinformasjon.orgnummer,
                navn: sykmelding.organisasjonsinformasjon.orgNavn,
                harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(
                    sykmelding.organisasjonsinformasjon.orgnummer,
                    naermesteLedere
                ),
                naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(
                    sykmelding.organisasjonsinformasjon.orgnummer,
                    naermesteLedere
                ),
            };
        })
        .filter((sykmelding, idx, self) => {
            return (
                self.findIndex((t) => {
                    return t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null;
                }) === idx
            );
        });
};
