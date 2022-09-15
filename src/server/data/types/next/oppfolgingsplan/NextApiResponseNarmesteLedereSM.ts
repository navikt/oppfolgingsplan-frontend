import {NextApiResponse} from "next";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";

export interface NextApiResponseNarmesteLedereSM extends NextApiResponse {
    narmesteLedere: NarmesteLeder[];
}
