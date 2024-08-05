import { erSykmeldingGyldigForOppfolgingMedGrensedato } from "./oppfolgingplanUtils";
import { SykmeldingDTO } from "../schema/sykmeldingSchema";
import { NarmesteLederDTO } from "../schema/narmestelederSchema";
import { capitalizeEachWord } from "./textContextUtils";

export const sykmeldtHarNaermestelederHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLederDTO[],
) => {
  return (
    naermesteLedere.filter((leder) => {
      return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
    }).length > 0
  );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (
  virksomhetsnummer: string,
  naermesteLedere: NarmesteLederDTO[],
) => {
  const naermesteLeder = naermesteLedere.filter((leder) => {
    return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
  })[0];
  return naermesteLeder ? capitalizeEachWord(naermesteLeder.navn) : undefined;
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
  organisasjonsnavn: string;
  virksomhetsnummer: string;
  naermesteLederNavn: string | undefined | null;
  erAktivLederIVirksomhet: boolean;
}

export const finnArbeidsgivereForGyldigeSykmeldinger = (
  sykmeldinger: SykmeldingDTO[],
  naermesteLedere: NarmesteLederDTO[],
): ArbeidsgivereForGyldigeSykmeldinger[] => {
  const arbeidsgivereForGyldigeSykmeldinger = sykmeldinger
    .filter((sykmelding) =>
      erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, new Date()),
    )
    .map((sykmelding) => ({
      virksomhetsnummer: sykmelding.organisasjonsinformasjon.orgnummer,
      organisasjonsnavn: sykmelding.organisasjonsinformasjon.orgNavn,
      erAktivLederIVirksomhet: sykmeldtHarNaermestelederHosArbeidsgiver(
        sykmelding.organisasjonsinformasjon.orgnummer,
        naermesteLedere,
      ),
      naermesteLederNavn: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(
        sykmelding.organisasjonsinformasjon.orgnummer,
        naermesteLedere,
      ),
    }));

  return uniqueArbeidsgivereForSykmeldinger(
    arbeidsgivereForGyldigeSykmeldinger,
  );
};

function uniqueArbeidsgivereForSykmeldinger(
  sykmeldinger: ArbeidsgivereForGyldigeSykmeldinger[],
) {
  const uniqueOrgnumbersInSykmeldinger = new Set(
    sykmeldinger.map((s) => s.virksomhetsnummer),
  );
  return Array.from(uniqueOrgnumbersInSykmeldinger)
    .map((orgnummer) =>
      sykmeldinger.find((s) => s.virksomhetsnummer === orgnummer),
    )
    .filter(
      (sykmelding): sykmelding is ArbeidsgivereForGyldigeSykmeldinger =>
        sykmelding !== undefined,
    );
}
