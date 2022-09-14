const finnNavn = (fnr, state) => {
  return (
    state.person.data
      .filter((person) => {
        return person.fnr === fnr;
      })
      .map((person) => {
        return person.navn;
      })[0] || ''
  );
};

const finnKontaktinfo = (fnr, state) => {
  return (
    state.kontaktinfo.data
      .filter((kontaktinfo) => {
        return kontaktinfo.fnr === fnr;
      })
      .map((kontaktinfo) => {
        return kontaktinfo.kontaktinfo;
      })[0] || {}
  );
};

const finnNaermesteLeder = (fnr, virksomhetsnummer, state) => {
  return (
    state.naermesteleder.data
      .filter((naermesteleder) => {
        return (
          naermesteleder.fnr === fnr &&
          naermesteleder.virksomhetsnummer === virksomhetsnummer &&
          naermesteleder.naermesteLeder.erAktiv
        );
      })
      .map((naermesteleder) => {
        return naermesteleder.naermesteLeder;
      })[0] || null
  );
};

const finnVirksomhetsnavn = (virksomhetsnummer, state) => {
  return (
    state.virksomhet.data
      .filter((virksomhet) => {
        return virksomhet.virksomhetsnummer === virksomhetsnummer;
      })
      .map((virksomhet) => {
        return virksomhet.navn;
      })[0] || ''
  );
};

const finnArbeidsforhold = (fnr, virksomhetsnummer, opprettetDato, state) => {
  const arbeidsforhold =
    state.arbeidsforhold.data.filter((_arbeidsforhold) => {
      return _arbeidsforhold.virksomhetsnummer === virksomhetsnummer && _arbeidsforhold.fnr === fnr;
    })[0] || null;
  if (!arbeidsforhold) {
    return [];
  }
  return arbeidsforhold.stillinger
    .map((_stilling) => {
      const stilling = _stilling;
      stilling.fom = new Date(stilling.fom);
      stilling.tom = stilling.tom && new Date(stilling.tom);
      return stilling;
    })
    .filter((stilling) => {
      return stilling.fom < new Date(opprettetDato) && (!stilling.tom || stilling.tom < new Date(opprettetDato));
    });
};

export const populerPlanFraState = (_oppfolgingsplan, state) => {
  const oppfolgingsplan = _oppfolgingsplan;
  oppfolgingsplan.arbeidstaker.navn = finnNavn(oppfolgingsplan.arbeidstaker.fnr, state);
  const kontaktinfo = finnKontaktinfo(oppfolgingsplan.arbeidstaker.fnr, state);
  oppfolgingsplan.arbeidstaker.epost = kontaktinfo.epost;
  oppfolgingsplan.arbeidstaker.tlf = kontaktinfo.tlf;
  oppfolgingsplan.arbeidstaker.skalHaVarsel = kontaktinfo.skalHaVarsel;
  // eslint-disable-next-line max-len
  oppfolgingsplan.arbeidstaker.stillinger = finnArbeidsforhold(
    oppfolgingsplan.arbeidstaker.fnr,
    oppfolgingsplan.virksomhet.virksomhetsnummer,
    oppfolgingsplan.opprettetDato,
    state
  );
  oppfolgingsplan.virksomhet.navn = finnVirksomhetsnavn(oppfolgingsplan.virksomhet.virksomhetsnummer, state);
  const naermesteleder = finnNaermesteLeder(
    oppfolgingsplan.arbeidstaker.fnr,
    oppfolgingsplan.virksomhet.virksomhetsnummer,
    state
  );
  oppfolgingsplan.arbeidsgiver.naermesteLeder.virksomhetsnummer = naermesteleder && naermesteleder.virksomhetsnummer;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.epost = naermesteleder && naermesteleder.epost;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.navn = naermesteleder && naermesteleder.navn;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr = naermesteleder && naermesteleder.fnr;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.tlf = naermesteleder && naermesteleder.tlf;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.erAktiv = naermesteleder && naermesteleder.erAktiv;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.aktivFom = naermesteleder && naermesteleder.aktivFom;
  oppfolgingsplan.arbeidsgiver.naermesteLeder.aktivTom = naermesteleder && naermesteleder.aktivTom;
  oppfolgingsplan.sistEndretAv.navn = finnNavn(oppfolgingsplan.sistEndretAv.fnr, state);
  oppfolgingsplan.arbeidsoppgaveListe.map((_arbeidsoppgave) => {
    const arbeidsoppgave = _arbeidsoppgave;
    arbeidsoppgave.opprettetAv.navn = finnNavn(arbeidsoppgave.opprettetAv.fnr, state);
    arbeidsoppgave.sistEndretAv.navn = finnNavn(arbeidsoppgave.sistEndretAv.fnr, state);
    return arbeidsoppgave;
  });
  oppfolgingsplan.tiltakListe.map((_tiltak) => {
    const tiltak = _tiltak;
    tiltak.opprettetAv.navn = finnNavn(tiltak.opprettetAv.fnr, state);
    tiltak.sistEndretAv.navn = finnNavn(tiltak.sistEndretAv.fnr, state);
    tiltak.kommentarer.map((_kommentar) => {
      const kommentar = _kommentar;
      kommentar.opprettetAv.navn = finnNavn(kommentar.opprettetAv.fnr, state);
      kommentar.sistEndretAv.navn = finnNavn(kommentar.sistEndretAv.fnr, state);
      return kommentar;
    });
    return tiltak;
  });
  oppfolgingsplan.godkjenninger.map((_godkjenning) => {
    const godkjenning = _godkjenning;
    godkjenning.godkjentAv.navn = finnNavn(godkjenning.godkjentAv.fnr, state);
    return godkjenning;
  });
  return oppfolgingsplan;
};
