import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../../environments/publicEnv";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../../server/utils/requestUtils";
import { godkjennOppfolgingsplanSM } from "../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../server/auth/beskyttetApi";
import { GodkjennPlanData } from "../../../../../../schema/godkjennPlanSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const data: GodkjennPlanData = req.body;

    await godkjennOppfolgingsplanSM(tokenX, oppfolgingsplanId, data);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
