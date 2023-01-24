import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { delMedNav } from "../../../../../server/service/oppfolgingsplanService";
import { isMockBackend } from "../../../../../environments/publicEnv";
import { getOppfolgingsplanIdFromRequest } from "../../../../../server/utils/requestUtils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);

    await delMedNav(tokenX, oppfolgingsplanId);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
