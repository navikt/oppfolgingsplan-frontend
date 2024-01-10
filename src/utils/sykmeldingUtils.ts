import { erSykmeldingGyldigForOppfolgingMedGrensedato } from "./oppfolgingplanUtils";
import { SykmeldingDTO } from "../schema/sykmeldingSchema";
import { NarmesteLederDTO } from "../schema/narmestelederSchema";

export const sykmeldtHarNaermestelederHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLederDTO[],
) => {
  return (
    naermesteLedere.filter((leder) => {
      return virksomhetsnummer === leder.virksomhetsnummer;
    }).length > 0
  );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLederDTO[],
) => {
  const naermesteLeder = naermesteLedere.filter((leder) => {
    return virksomhetsnummer === leder.virksomhetsnummer;
  })[0];
  return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarIngenSendteSykmeldinger = (
  sykmeldinger: SykmeldingDTO[],
) => {
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
        return erSykmeldingGyldigForOppfolgingMedGrensedato(
          sykmelding,
          tomGrenseDato,
        );
      }).length > 0
  );
};

export interface ArbeidsgivereForGyldigeSykmeldinger {
  navn: string;
  virksomhetsnummer: string;
  naermesteLeder: string | undefined | null;
  harNaermesteLeder: boolean;
}

export const finnArbeidsgivereForGyldigeSykmeldinger = (
  sykmeldinger: SykmeldingDTO[],
  naermesteLedere: NarmesteLederDTO[],
): ArbeidsgivereForGyldigeSykmeldinger[] => {
  const dagensDato = new Date();
  return sykmeldinger
    .filter((sykmelding) => {
      return erSykmeldingGyldigForOppfolgingMedGrensedato(
        sykmelding,
        dagensDato,
      );
    })
    .map((sykmelding) => {
      return {
        virksomhetsnummer: sykmelding.organisasjonsinformasjon.orgnummer,
        navn: sykmelding.organisasjonsinformasjon.orgNavn,
        harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(
          sykmelding.organisasjonsinformasjon.orgnummer,
          naermesteLedere,
        ),
        naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(
          sykmelding.organisasjonsinformasjon.orgnummer,
          naermesteLedere,
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
