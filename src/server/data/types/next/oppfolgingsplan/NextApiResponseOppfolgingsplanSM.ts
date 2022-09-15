import {NextApiResponse} from "next";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
    oppfolgingsplaner: Oppfolgingsplan[];
}
