import { NextApiRequest, NextApiResponse } from "next";
import { Sykmelding } from "../../../../schema/sykmeldingSchema";
import { isMockBackend } from "../../../../environments/publicEnv";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getSykmeldingerSM } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Sykmelding[]>
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb().sykmeldinger);
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const sykmeldingerResponse = await getSykmeldingerSM(tokenX);

    res.status(200).json(sykmeldingerResponse);
  }
};

export default beskyttetApi(handler);
