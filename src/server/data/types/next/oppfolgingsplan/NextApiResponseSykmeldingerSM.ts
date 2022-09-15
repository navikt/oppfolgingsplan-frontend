import {NextApiResponse} from "next";
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";

export interface NextApiResponseSykmeldingerSM extends NextApiResponse {
    sykmeldinger: Sykmelding[];
}
