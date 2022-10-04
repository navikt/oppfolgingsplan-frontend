import { NextApiResponse } from "next";
import { Tilgang } from "../../../../../schema/tilgangSchema";

export interface NextApiResponseTilgangSM extends NextApiResponse {
  tilgang: Tilgang;
}
