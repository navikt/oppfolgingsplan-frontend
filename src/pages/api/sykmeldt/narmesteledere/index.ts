import { NextApiRequest, NextApiResponse } from "next";
import { getNarmesteLedere } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { isMockBackend } from "../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb(req).narmesteLedere);
  } else {
    const tokenX = await getOppfolgingsplanBackendTokenFromRequest(req);
    const narmesteLedereResponse = await getNarmesteLedere(tokenX);

    res.status(200).json(narmesteLedereResponse);
  }
};

export default beskyttetApi(handler);
