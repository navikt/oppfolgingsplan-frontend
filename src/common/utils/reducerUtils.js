export const finnUnikeElementer = (liste) => {
  return new Set(
    Array.from(new Set(liste.map(JSON.stringify))).map(JSON.parse)
  );
};

export const henterEllerHarHentetLedere = (ledere) => {
  return ledere.henter || ledere.hentet;
};

export const henterEllerHarHentetTilgang = (tilgang) => {
  return tilgang.henter || tilgang.hentet || tilgang.hentingFeilet;
};

export const henterEllerHarHentetOppfolgingsplaner = (oppfolgingsplaner) => {
  return (
    oppfolgingsplaner.henter ||
    oppfolgingsplaner.hentet ||
    oppfolgingsplaner.hentingFeilet
  );
};

export const oppfolgingsplanHarBlittAvbrutt = (avbrytplan, nesteAvbrytplan) => {
  return avbrytplan.sender && nesteAvbrytplan.sendt;
};

export const oppfolgingsplanHarBlittOpprettet = (
  oppfolgingsplaner,
  nesteOppfolgingsplaner
) => {
  return oppfolgingsplaner.oppretter && nesteOppfolgingsplaner.opprettet;
};

export const henterEllerHarHentetVirksomhet = (
  virksomhetsnummer,
  virksomhet
) => {
  return (
    virksomhet.henter.filter((henter) => {
      return henter === virksomhetsnummer;
    }).length > 0 ||
    virksomhet.hentet.filter((hentet) => {
      return hentet === virksomhetsnummer;
    }).length > 0
  );
};

export const henterEllerHarHentetPerson = (fnr, person) => {
  return (
    person.henter.filter((henter) => {
      return henter === fnr;
    }).length > 0 ||
    person.hentet.filter((hentet) => {
      return hentet === fnr;
    }).length > 0
  );
};

export const henterEllerHarHentetKontaktinfo = (fnr, kontaktinfo) => {
  return (
    kontaktinfo.henter.filter((henter) => {
      return henter === fnr;
    }).length > 0
  );
};

export const henterEllerHarHentetNaermesteLeder = (
  fnr,
  virksomhetsnummer,
  naermesteleder
) => {
  return (
    naermesteleder.henter.filter((henter) => {
      return (
        henter.virksomhetsnummer === virksomhetsnummer && henter.fnr === fnr
      );
    }).length > 0 ||
    naermesteleder.hentet.filter((hentet) => {
      return (
        hentet.virksomhetsnummer === virksomhetsnummer && hentet.fnr === fnr
      );
    }).length > 0
  );
};

export const henterEllerHarHentetArbeidsforhold = (
  fnr,
  virksomhetsnummer,
  arbeidsforhold
) => {
  return (
    arbeidsforhold.henter.filter((henter) => {
      return (
        henter.virksomhetsnummer === virksomhetsnummer && henter.fnr === fnr
      );
    }).length > 0 ||
    arbeidsforhold.hentet.filter((hentet) => {
      return (
        hentet.virksomhetsnummer === virksomhetsnummer && hentet.fnr === fnr
      );
    }).length > 0
  );
};

export const finnOgHentVirksomheterSomMangler = (
  oppfolgingsdialoger,
  virksomhet,
  hentVirksomhet
) => {
  const virksomhetsnummerSet = new Set();
  oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
    if (oppfolgingsdialog.virksomhet) {
      virksomhetsnummerSet.add(oppfolgingsdialog.virksomhet.virksomhetsnummer);
    }
  });

  virksomhetsnummerSet.forEach((virksomhetsnummer) => {
    if (!henterEllerHarHentetVirksomhet(virksomhetsnummer, virksomhet)) {
      hentVirksomhet(virksomhetsnummer);
    }
  });
};

export const finnOgHentPersonerSomMangler = (
  oppfolgingsplaner,
  person,
  hentPerson
) => {
  const fnrSet = new Set();
  oppfolgingsplaner.forEach((oppfolgingsplan) => {
    fnrSet.add(oppfolgingsplan.arbeidstaker.fnr);
  });
  fnrSet.forEach((fnr) => {
    if (!henterEllerHarHentetPerson(fnr, person)) {
      hentPerson(fnr);
    }
  });
};

export const finnOgHentKontaktinfoSomMangler = (
  oppfolgingsdialoger,
  kontaktinfo,
  hentKontaktinfo
) => {
  const kontaktinfoSet = new Set();
  oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
    kontaktinfoSet.add(oppfolgingsdialog.arbeidstaker.fnr);
  });

  kontaktinfoSet.forEach((fnr) => {
    if (!henterEllerHarHentetKontaktinfo(fnr, kontaktinfo)) {
      hentKontaktinfo(fnr);
    }
  });
};

export const finnOgHentArbeidsforholdSomMangler = (
  oppfolgingsdialoger,
  arbeidsforhold,
  hentArbeidsforhold
) => {
  const arbeidsforholdListe = [];
  oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
    arbeidsforholdListe.push({
      fnr: oppfolgingsdialog.arbeidstaker.fnr,
      fom: oppfolgingsdialog.opprettetDato,
      virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
    });
  });
  const unikeArbeidsforhold = finnUnikeElementer(arbeidsforholdListe);
  unikeArbeidsforhold.forEach((uniktArbeidsforhold) => {
    if (
      !henterEllerHarHentetArbeidsforhold(
        uniktArbeidsforhold.fnr,
        uniktArbeidsforhold.virksomhetsnummer,
        arbeidsforhold
      )
    ) {
      hentArbeidsforhold(
        uniktArbeidsforhold.fnr,
        uniktArbeidsforhold.virksomhetsnummer,
        uniktArbeidsforhold.fom
      );
    }
  });
};

export const finnOgHentNaermesteLedereListeSomMangler = (
  dinesykmeldinger,
  naermesteLedere,
  hentLedere
) => {
  if (!henterEllerHarHentetLedere(naermesteLedere)) {
    const sykmelding = dinesykmeldinger.data[0];
    if (sykmelding) {
      hentLedere(sykmelding.fnr);
    }
  }
};

export const finnOgHentNaermesteLedereSomMangler = (
  oppfolgingsdialoger,
  naermesteleder,
  hentNaermesteLeder
) => {
  const naermesteLedereForFnrHosVirksomhet = [];
  oppfolgingsdialoger.forEach((oppfolgingsdialog) => {
    naermesteLedereForFnrHosVirksomhet.push({
      fnr: oppfolgingsdialog.arbeidstaker.fnr,
      virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
    });
  });
  const naermesteLedereForFnrHosVirksomhetSet = finnUnikeElementer(
    naermesteLedereForFnrHosVirksomhet
  );
  naermesteLedereForFnrHosVirksomhetSet.forEach(
    (naermesteLederForFnrHosVirksomhet) => {
      if (
        !henterEllerHarHentetNaermesteLeder(
          naermesteLederForFnrHosVirksomhet.fnr,
          naermesteLederForFnrHosVirksomhet.virksomhetsnummer,
          naermesteleder
        )
      ) {
        hentNaermesteLeder(
          naermesteLederForFnrHosVirksomhet.fnr,
          naermesteLederForFnrHosVirksomhet.virksomhetsnummer
        );
      }
    }
  );
};
