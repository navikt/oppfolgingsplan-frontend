import { NextApiResponse } from "next";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";

export interface NextApiResponseNarmesteLedereSM extends NextApiResponse {
  narmesteLedere: NarmesteLeder[];
}
