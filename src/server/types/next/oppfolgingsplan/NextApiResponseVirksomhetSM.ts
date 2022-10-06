import { NextApiResponse } from "next";
import { Virksomhet } from "../../../../schema/oppfolgingsplanSchema";

export interface NextApiResponseVirksomhetSM extends NextApiResponse {
  virksomhet: Virksomhet;
}
