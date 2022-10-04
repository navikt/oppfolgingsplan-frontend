import { NextApiResponse } from "next";
import { Sykmelding } from "../../../../schema/sykmeldingSchema";

export interface NextApiResponseSykmeldingerSM extends NextApiResponse {
  sykmeldinger: Sykmelding[];
}
