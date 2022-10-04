import { NextApiResponse } from "next";
import { Oppfolgingsplan } from "../../../../../schema/oppfolgingsplanSchema";

export interface NextApiResponseOppfolgingsplanSM extends NextApiResponse {
  oppfolgingsplaner: Oppfolgingsplan[];
}
