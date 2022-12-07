import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../../environments/publicEnv";
import { getTokenXTokenFromRequest } from "../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../../server/utils/requestUtils";
import { saveTiltak } from "../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../server/auth/beskyttetApi";
import { Tiltak } from "../../../../../../schema/oppfolgingsplanSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getTokenXTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const tiltak: Tiltak = req.body;

    await saveTiltak(tokenX, oppfolgingsplanId, tiltak);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
