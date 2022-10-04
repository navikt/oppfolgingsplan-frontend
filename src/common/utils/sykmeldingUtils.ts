import { erSykmeldingGyldigForOppfolgingMedGrensedato } from "./oppfolgingsdialogUtils";
import { Sykmelding } from "../../schema/sykmeldingSchema";
import { NarmesteLeder } from "../../schema/narmestelederSchema";

export const sykmeldtHarNaermestelederHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLeder[]
) => {
  return (
    naermesteLedere.filter((leder) => {
      return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
    }).length > 0
  );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLeder[]
) => {
  const naermesteLeder = naermesteLedere.filter((leder) => {
    return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
  })[0];
  return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarIngenSendteSykmeldinger = (
  sykmeldinger: Sykmelding[]
) => {
  return sykmeldinger.length === 0;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger: Sykmelding[]) => {
  const tomGrenseDato = new Date();
  return (
    sykmeldinger
      .filter((sykmelding) => {
        return sykmelding.organisasjonsinformasjon.orgnummer;
      })
      .filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(
          sykmelding,
          tomGrenseDato
        );
      }).length > 0
  );
};

export interface ArbeidsgivereForGyldigeSykmeldinger {
  navn: string;
  virksomhetsnummer: string;
  naermesteLeder: string | undefined;
  harNaermesteLeder: boolean;
}

export const finnArbeidsgivereForGyldigeSykmeldinger = (
  sykmeldinger: Sykmelding[],
  naermesteLedere: NarmesteLeder[]
): ArbeidsgivereForGyldigeSykmeldinger[] => {
  const dagensDato = new Date();
  return sykmeldinger
    .filter((sykmelding) => {
      return erSykmeldingGyldigForOppfolgingMedGrensedato(
        sykmelding,
        dagensDato
      );
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
          return (
            t.virksomhetsnummer === sykmelding.virksomhetsnummer &&
            sykmelding.virksomhetsnummer !== null
          );
        }) === idx
      );
    });
};
