import {NextApiResponse} from "next";
import {Tilgang} from "@/types/oppfolgingsplanservice/tilgangType";

export interface NextApiResponseTilgangSM extends NextApiResponse {
    tilgang: Tilgang;
}
