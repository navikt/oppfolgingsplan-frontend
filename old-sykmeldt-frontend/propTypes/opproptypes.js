import PropTypes from 'prop-types';

export const evalueringPt = PropTypes.shape({
  effekt: PropTypes.string,
  hvorfor: PropTypes.string,
  videre: PropTypes.string,
  interneaktiviteter: PropTypes.bool,
  ekstratid: PropTypes.bool,
  bistand: PropTypes.bool,
  ingen: PropTypes.bool,
});

export const gjennomfoeringPt = PropTypes.shape({
  kanGjennomfoeres: PropTypes.string,
  paaAnnetSted: PropTypes.bool,
  medMerTid: PropTypes.bool,
  medHjelp: PropTypes.bool,
  kanBeskrivelse: PropTypes.string,
  kanIkkeBeskrivelse: PropTypes.string,
});

export const gyldighetstidspunktPt = PropTypes.shape({
  fom: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  tom: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  evalueres: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
});

export const kontaktInfoPt = PropTypes.shape({
  epost: PropTypes.string,
  tlf: PropTypes.string,
  skalHaVarsel: PropTypes.bool,
  feilAarsak: PropTypes.string,
});

export const personPt = PropTypes.shape({
  navn: PropTypes.string,
  fnr: PropTypes.string,
  epost: PropTypes.string,
  tlf: PropTypes.string,
  sistInnlogget: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  samtykke: PropTypes.bool,
  evaluering: evalueringPt,
});

export const stillingPt = PropTypes.shape({
  yrke: PropTypes.string,
  prosent: PropTypes.number,
  virksomhetsnummer: PropTypes.string,
  fom: PropTypes.instanceOf(Date),
  tom: PropTypes.instanceOf(Date),
});

export const tilgangPt = PropTypes.shape({
  harTilgang: PropTypes.bool,
  ikkeTilgangGrunn: PropTypes.string,
});

export const arbeidsoppgavePt = PropTypes.shape({
  arbeidsoppgaveId: PropTypes.number,
  arbeidsoppgavenavn: PropTypes.string,
  erVurdertAvSykmeldt: PropTypes.bool,
  gjennomfoering: gjennomfoeringPt,
  opprettetDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  sistEndretAv: personPt,
  sistEndretDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  opprettetAv: personPt,
});

export const tiltakPt = PropTypes.shape({
  tiltakId: PropTypes.number,
  tiltaknavn: PropTypes.string,
  knyttetTilArbeidsoppgaveId: PropTypes.number,
  fom: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  tom: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  beskrivelse: PropTypes.string,
  opprettetDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  sistEndretAv: personPt,
  sistEndretDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  opprettetAv: personPt,
});

export const kommentarPt = PropTypes.shape({
  id: PropTypes.number,
  tiltakId: PropTypes.number,
  tekst: PropTypes.string,
  sistEndretAvAktoerId: PropTypes.string,
  sistEndretDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  opprettetAvAktoerId: PropTypes.string,
  opprettetDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
});

export const avbruttPlanPt = PropTypes.shape({
  av: personPt,
  tidspunkt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  id: PropTypes.number,
});

export const godkjenningPt = PropTypes.shape({
  godkjent: PropTypes.bool,
  godkjentAv: personPt,
  beskrivelse: PropTypes.string,
  godkjenningsTidspunkt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  gyldighetstidspunkt: gyldighetstidspunktPt,
});

export const godkjentPlanPt = PropTypes.shape({
  opprettetTidspunkt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  gyldighetstidspunkt: gyldighetstidspunktPt,
  tvungenGodkjenning: PropTypes.bool,
  deltMedNAVTidspunkt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  deltMedNAV: PropTypes.bool,
  dokumentUuid: PropTypes.string,
  avbruttPlan: avbruttPlanPt,
});

export const virksomhetPt = PropTypes.shape({
  virksomhetsnummer: PropTypes.string,
  navn: PropTypes.string,
});

export const oppfolgingsplanPt = PropTypes.shape({
  id: PropTypes.number,
  sistEndretAv: personPt,
  sistEndretDato: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  status: PropTypes.string,
  virksomhet: virksomhetPt,
  godkjentPlan: godkjentPlanPt,
  godkjenninger: PropTypes.arrayOf(godkjenningPt),
  arbeidsoppgaveListe: PropTypes.arrayOf(arbeidsoppgavePt),
  tiltakListe: PropTypes.arrayOf(tiltakPt),
  avbruttPlanListe: PropTypes.arrayOf(avbruttPlanPt),
  arbeidsgiver: personPt,
  arbeidstaker: personPt,
});

export const personReducerPt = PropTypes.shape({
  henter: PropTypes.arrayOf(PropTypes.string),
  hentet: PropTypes.arrayOf(PropTypes.string),
  hentingFeilet: PropTypes.arrayOf(PropTypes.string),
});

export const virksomhetReducerPt = PropTypes.shape({
  henter: PropTypes.arrayOf(PropTypes.string),
  hentet: PropTypes.arrayOf(PropTypes.string),
  hentingFeilet: PropTypes.arrayOf(PropTypes.string),
});

export const fnrvirksomhetsnummerPt = PropTypes.shape({
  fnr: PropTypes.string,
  virksomhetsnummer: PropTypes.string,
});

export const naermestelederReducerPt = PropTypes.shape({
  henter: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
  hentet: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
  hentingFeilet: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
});

export const arbeidsforholdReducerPt = PropTypes.shape({
  henter: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
  hentet: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
  hentingFeilet: PropTypes.arrayOf(fnrvirksomhetsnummerPt),
});

export const kontaktinfoReducerPt = PropTypes.shape({
  henter: PropTypes.arrayOf(PropTypes.string),
  hentet: PropTypes.arrayOf(PropTypes.string),
  hentingFeilet: PropTypes.arrayOf(PropTypes.string),
});

export const oppfolgingsplanerAtPt = PropTypes.shape({
  henter: PropTypes.bool,
  hentet: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  oppretter: PropTypes.bool,
  opprettet: PropTypes.bool,
  opprettingFeilet: PropTypes.bool,
  godkjenner: PropTypes.bool,
  godkjent: PropTypes.bool,
  godkjenningFeilet: PropTypes.bool,
  avviser: PropTypes.bool,
  avvist: PropTypes.bool,
  avvisFeilet: PropTypes.bool,
  data: PropTypes.arrayOf(oppfolgingsplanPt),
});

export const arbeidsoppgaverReducerPt = PropTypes.shape({
  slettet: PropTypes.bool,
  sletter: PropTypes.bool,
  slettingFeilet: PropTypes.bool,
  lagrer: PropTypes.bool,
  lagret: PropTypes.bool,
  lagringFeilet: PropTypes.bool,
  godkjenner: PropTypes.bool,
  godkjent: PropTypes.bool,
  godkjenningFeilet: PropTypes.bool,
  data: PropTypes.arrayOf(arbeidsoppgavePt),
});

export const avbrytplanReducerPt = PropTypes.shape({
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const kopierPlanReducerPt = PropTypes.shape({
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const navigasjonstogglesReducerPt = PropTypes.shape({
  steg: PropTypes.number,
});

export const nullstillGodkjenningReducerPt = PropTypes.shape({
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
});

export const samtykkeReducerPt = PropTypes.shape({
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
});

export const tilgangReducerPt = PropTypes.shape({
  henter: PropTypes.bool,
  hentet: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  data: tilgangPt,
});

export const kommentarReducerPt = PropTypes.shape({
  slettet: PropTypes.bool,
  sletter: PropTypes.bool,
  slettingFeilet: PropTypes.bool,
  lagrer: PropTypes.bool,
  lagret: PropTypes.bool,
  lagringFeilet: PropTypes.bool,
});

export const tiltakReducerPt = PropTypes.shape({
  slettet: PropTypes.bool,
  sletter: PropTypes.bool,
  slettingFeilet: PropTypes.bool,
  lagrer: PropTypes.bool,
  lagret: PropTypes.bool,
  lagringFeilet: PropTypes.bool,
  godkjenner: PropTypes.bool,
  godkjent: PropTypes.bool,
  godkjenningFeilet: PropTypes.bool,
  data: PropTypes.arrayOf(tiltakPt),
});

export const delMedFastlegePt = PropTypes.shape({
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  data: PropTypes.map,
});

export const delmednavPt = PropTypes.shape({
  data: PropTypes.map,
  sender: PropTypes.bool,
  sendt: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
});
