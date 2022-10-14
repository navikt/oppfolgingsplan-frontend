import { NextApiResponse } from "next";

export interface NextApiResponseOppfolgingsplanPdfSM extends NextApiResponse {
  pdf: any;
}
