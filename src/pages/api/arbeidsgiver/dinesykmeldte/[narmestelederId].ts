import { NextApiRequest, NextApiResponse } from "next";
import { getDineSykmeldteTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { getSykmeldt } from "../../../../server/service/oppfolgingsplanService";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { isMockBackend } from "../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb(req).sykmeldt);
  } else {
    const accessToken = await getDineSykmeldteTokenFromRequest(req);
    const { narmestelederId } = <{ narmestelederId: string }>req.query;
    const response = await getSykmeldt(narmestelederId, accessToken);

    res.status(200).json(response);
  }
};

export default beskyttetApi(handler);
