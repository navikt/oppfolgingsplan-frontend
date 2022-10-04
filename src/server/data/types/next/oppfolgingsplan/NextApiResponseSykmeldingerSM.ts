import {NextApiResponse} from "next";
import {SykmeldingDTO} from "@/server/service/schema/sykmeldingSchema";

export interface NextApiResponseSykmeldingerSM extends NextApiResponse {
    sykmeldinger: SykmeldingDTO[];
}
