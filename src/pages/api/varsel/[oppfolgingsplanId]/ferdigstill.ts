import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { ferdigstillVarsel } from "../../../../server/service/oppfolgingsplanService";
import { getOppfolgingsplanIdFromRequest } from "../../../../server/utils/requestUtils";
import { isMockBackend } from "../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    await ferdigstillVarsel(tokenX, oppfolgingsplanId);
    console.log("OPPFOLGINGSPLAN ID: ", oppfolgingsplanId);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
