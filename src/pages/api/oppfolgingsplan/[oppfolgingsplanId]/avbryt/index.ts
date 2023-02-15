import { NextApiRequest, NextApiResponse } from "next";
import { avbrytOppfolgingsplan } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { isMockBackend } from "../../../../../environments/publicEnv";
import { getOppfolgingsplanIdFromRequest } from "../../../../../server/utils/requestUtils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).send("456");
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);

    const newOppfolgingsplanId = await avbrytOppfolgingsplan(
      tokenX,
      oppfolgingsplanId
    );
    res.status(200).send(newOppfolgingsplanId);
  }
};

export default beskyttetApi(handler);
