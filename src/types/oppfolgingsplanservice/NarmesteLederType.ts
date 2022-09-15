export interface NarmesteLeder {
    virksomhetsnummer: string;
    erAktiv: boolean;
    aktivFom: string;
    aktivTom?: string | null;
    navn: string;
    fnr: string;
    epost?: string | null;
    tlf?: string | null;
    sistInnlogget?: string | null;
    samtykke?: boolean | null
}