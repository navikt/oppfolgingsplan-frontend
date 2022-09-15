import {Sykmeldingsperiode} from "@/types/oppfolgingsplanservice/sykmeldingsperiode";
import {Organisasjonsinformasjon} from "@/types/oppfolgingsplanservice/organisasjonsinformasjon";

export interface Sykmelding {
    id: string;
    fnr: string;
    sykmeldingsperioder: Sykmeldingsperiode[];
    organisasjonsinformasjon: Organisasjonsinformasjon;
}