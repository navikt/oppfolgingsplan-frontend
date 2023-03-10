import { NextApiRequest, NextApiResponse } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../../server/utils/requestUtils";
import { godkjennEgenOppfolgingsplanAG } from "../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../server/auth/beskyttetApi";
import { GodkjennEgenPlan } from "../../../../../../types/oppfolgingsplan";
import { isMockBackend } from "../../../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const data: GodkjennEgenPlan = req.body;

    await godkjennEgenOppfolgingsplanAG(tokenX, oppfolgingsplanId, data);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
