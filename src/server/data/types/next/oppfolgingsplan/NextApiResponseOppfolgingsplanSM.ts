import {NextApiResponse} from "next";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
    oppfolgingsplaner: OppfolgingsplanDTO[];
}
