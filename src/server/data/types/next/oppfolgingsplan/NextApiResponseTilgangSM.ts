import { NextApiResponse } from "next";
import { TilgangDTO } from "@/server/service/schema/tilgangSchema";

export interface NextApiResponseTilgangSM extends NextApiResponse {
  tilgang: TilgangDTO;
}
