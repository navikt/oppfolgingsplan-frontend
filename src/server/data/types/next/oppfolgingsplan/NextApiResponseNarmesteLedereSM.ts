import { NextApiResponse } from "next";
import { NarmesteLedereDTO } from "@/server/service/schema/narmestelederSchema";

export interface NextApiResponseNarmesteLedereSM extends NextApiResponse {
  narmesteLedere: NarmesteLedereDTO;
}
