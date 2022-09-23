export interface Oppfolgingsplan {
    id: number;
    sistEndretDato: string;
    opprettetDato: string;
    status: string;
    virksomhet: Virksomhet;
    godkjentPlan?: GodkjentPlan | null;
    godkjenninger: Godkjenning[];
    arbeidsoppgaveListe: Arbeidsoppgave[];
    tiltakListe: Tiltak[];
    avbruttPlanListe: Avbruttplan[]
    arbeidsgiver: Arbeidsgiver;
    arbeidstaker: Person;
    sistEndretAv: Person;
}

export interface Virksomhet {
    virksomhetsnummer: string;
    navn: string;
}

export interface GodkjentPlan {
    opprettetTidspunkt: string;
    gyldighetstidspunkt?: Gyldighetstidspunkt | null;
    tvungenGodkjenning?: boolean | null;
    deltMedNAVTidspunkt?: string | null;
    deltMedNAV?: boolean | null;
    deltMedFastlegeTidspunkt?: string | null;
    deltMedFastlege?: boolean | null;
    dokumentUuid?: string | null;
    avbruttPlan?: Avbruttplan | null;
}

export interface Gyldighetstidspunkt {
    fom: string;
    tom: string;
    evalueres: string;
}

export interface Person {
    navn: string;
    fnr?: string | null;
    epost?: string | null;
    tlf?: string | null;
    sistInnlogget?: string | null;
    samtykke?: boolean | null;
    evaluering?: Evaluering | null;
    stillinger?: Stilling[] | null;
}

export interface Evaluering {
    effekt?: string | null;
    hvorfor?: string | null;
    videre?: string | null;
    interneaktiviteter?: string | null;
    ekstratid?: boolean | null;
    bistand?: boolean | null;
    ingen?: boolean | null;
}

export interface Stilling {
    virksomhetsnummer: string;
    yrke: string;
    prosent: number,
    fom: string;
    tom: string;
}

export interface Godkjenning {
    godkjent: boolean;
    godkjentAv: Person;
    beskrivelse: string;
    godkjenningsTidspunkt: string;
    gyldighetstidspunkt: Gyldighetstidspunkt;
    delMedNav: boolean;
}

export interface Arbeidsoppgave {
    arbeidsoppgaveId: number;
    arbeidsoppgavenavn: string;
    erVurdertAvSykmeldt?: boolean | null;
    gjennomfoering?: Gjennomforing | null;
    opprettetDato: string;
    sistEndretDato: string;
    sistEndretAv: Person;
    opprettetAv: Person;
}

export interface Gjennomforing {
    kanGjennomfoeres: string;
    paaAnnetSted?: boolean | null;
    medMerTid?: boolean | null;
    medHjelp?: boolean | null;
    kanBeskrivelse?: string | null;
    kanIkkeBeskrivelse?: string | null;
}

export interface Tiltak {
    tiltakId: number;
    tiltaknavn: string;
    knyttetTilArbeidsoppgaveId?: number | null;
    fom?: string | null;
    tom?: string | null;
    beskrivelse?: string | null;
    beskrivelseIkkeAktuelt?: string | null;
    opprettetDato: string;
    sistEndretDato: string;
    kommentarer?: Kommentar[] | null;
    status?: string | null;
    gjennomfoering?: string | null;
    opprettetAv: Person;
    sistEndretAv: Person;
}

export interface Kommentar {
    id: number;
    tekst: string;
    opprettetTidspunkt: string;
    sistEndretDato: string;
    opprettetAv: Person;
    sistEndretAv: Person;
}

export interface Arbeidsgiver {
    naermesteLeder: NaermesteLeder;
    forrigeNaermesteLeder?: NaermesteLeder | null;
}

export interface NaermesteLeder extends Person{
    virksomhetsnummer?: string | null;
    erAktiv?: boolean | null;
    aktivFom?: string | null;
    aktivTom?: string | null;
    navn: string;
    fnr?: string | null;
    epost?: string | null;
    tlf?: string | null;
    sistInnlogget?: string | null;
    samtykke?: boolean | null;
    evaluering?: Evaluering | null;
}

export interface Avbruttplan {
    av: Person;
    tidspunkt: string;
    id: number;
}