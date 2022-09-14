import { erSykmeldingGyldigForOppfolgingMedGrensedato } from './oppfolgingsdialogUtils';

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
  return (
    naermesteLedere.filter((leder) => {
      return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
    }).length > 0
  );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
  const naermesteLeder = naermesteLedere.filter((leder) => {
    return virksomhetsnummer === leder.virksomhetsnummer && leder.erAktiv;
  })[0];
  return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarIngenSendteSykmeldinger = (sykmeldinger) => {
  return sykmeldinger.length === 0;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
  const tomGrenseDato = new Date();
  return (
    sykmeldinger
      .filter((sykmelding) => {
        return sykmelding.organisasjonsinformasjon.orgnummer && sykmelding.organisasjonsinformasjon.orgnummer !== null;
      })
      .filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato);
      }).length > 0
  );
};

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger, naermesteLedere) => {
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

export const sykmeldtHarManglendeNaermesteLeder = (arbeidsgivere) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return !arbeidsgiver.harNaermesteLeder;
    }).length > 0
  );
};

export const sykmeldtHarNaermestelederHosArbeidsgivere = (arbeidsgivere) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return arbeidsgiver.harNaermesteLeder;
    }).length > 0
  );
};
