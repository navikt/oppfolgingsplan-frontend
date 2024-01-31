import { NextApiRequest, NextApiResponse } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../server/utils/requestUtils";
import { saveTiltak } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { isMockBackend } from "../../../../../server/utils/serverEnv";
import { TiltakDTO } from "../../../../../schema/oppfolgingsplanSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const tiltak: TiltakDTO = req.body;

    await saveTiltak(tokenX, oppfolgingsplanId, tiltak);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
