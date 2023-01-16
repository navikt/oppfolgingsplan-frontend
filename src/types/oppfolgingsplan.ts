export type Virksomhet = {
  virksomhetsnummer: string;
  navn: string;
};

export type Gyldighetstidspunkt = {
  fom?: string | null;
  tom?: string | null;
  evalueres?: string | null;
};

export type Avbruttplan = {
  tidspunkt: string;
  id?: number | null;
};

export type GodkjentPlan = {
  opprettetTidspunkt: string;
  gyldighetstidspunkt: Gyldighetstidspunkt;
  tvungenGodkjenning: boolean;
  deltMedNAVTidspunkt?: string | null;
  deltMedNAV: boolean;
  deltMedFastlegeTidspunkt?: string | null;
  deltMedFastlege: boolean;
  dokumentUuid: string;
  avbruttPlan: Avbruttplan | null;
};

type Evaluering = {
  effekt: string | null;
  hvorfor: string | null;
  videre: string | null;
  interneaktiviteter: boolean;
  ekstratid: boolean | null;
  bistand: boolean | null;
  ingen: boolean | null;
};

export type Stilling = {
  virksomhetsnummer: string;
  yrke: string;
  prosent: number;
  fom: string;
};

type Person = {
  navn: string;
  fnr: string;
  epost?: string | null;
  tlf?: string | null;
  sistInnlogget?: string | null;
  samtykke?: boolean | null;
  evaluering?: Evaluering | null;
  stillinger: {
    virksomhetsnummer: string;
    yrke: string;
    prosent: number;
    fom: string;
    tom: string;
  }[];
};

export type Godkjenning = {
  godkjent: boolean;
  godkjentAv: Person;
  beskrivelse?: string | null;
  godkjenningsTidspunkt: string;
  gyldighetstidspunkt: Gyldighetstidspunkt;
  delMedNav: boolean;
};

export type Gjennomforing = {
  kanGjennomfoeres: string;
  paaAnnetSted: boolean | null;
  medMerTid: boolean | null;
  medHjelp: boolean | null;
  kanBeskrivelse: string | null;
  kanIkkeBeskrivelse: string | null;
};

export type Arbeidsoppgave = {
  arbeidsoppgaveId: number;
  arbeidsoppgavenavn: string;
  erVurdertAvSykmeldt: boolean;
  gjennomfoering?: Gjennomforing | null;
  opprettetDato: string;
  sistEndretDato: string;
  sistEndretAv: Person;
  opprettetAv: Person;
};

export type Kommentar = {
  id: number;
  tekst: string | null;
  opprettetTidspunkt: string;
  sistEndretDato: string;
  opprettetAv: Person;
  sistEndretAv: Person;
};

export type Tiltak = {
  tiltakId: number;
  tiltaknavn: string;
  knyttetTilArbeidsoppgaveId: number | null;
  fom?: string | null;
  tom?: string | null;
  beskrivelse: string | null;
  beskrivelseIkkeAktuelt?: string | null;
  opprettetDato: string;
  sistEndretDato: string;
  kommentarer: Kommentar[];
  status: string;
  gjennomfoering?: string | null;
  opprettetAv: Person;
  sistEndretAv: Person;
};

export type NarmesteLeder = {
  virksomhetsnummer?: string | null;
  erAktiv?: boolean | null;
  aktivFom?: string | null;
  aktivTom: string | null;
  navn: string;
  fnr?: string | null;
  epost: string | null;
  tlf: string | null;
  sistInnlogget: string | null;
  samtykke: boolean | null;
};
type Arbeidsgiver = {
  naermesteLeder?: NarmesteLeder;
};

export type Arbeidstaker = Omit<Person, "stillinger"> & {
  stillinger: Stilling[];
};

export type Oppfolgingsplan = {
  id: number;
  sistEndretDato: string;
  opprettetDato: string;
  status: string;
  virksomhet: Virksomhet;
  godkjentPlan: GodkjentPlan | null;
  godkjenninger: Godkjenning[];
  arbeidsoppgaveListe: Arbeidsoppgave[];
  tiltakListe: Tiltak[];
  avbruttPlanListe: Avbruttplan[];
  arbeidsgiver: Arbeidsgiver;
  arbeidstaker: Arbeidstaker;
  sistEndretAv: Person;
};
