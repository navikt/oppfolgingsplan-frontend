import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../../../../environments/publicEnv";
import { getTokenXTokenFromRequest } from "../../../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getTiltakIdFromRequest } from "../../../../../../../../server/utils/requestUtils";
import { saveTiltakCommentSM } from "../../../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../../../server/auth/beskyttetApi";
import { Kommentar } from "../../../../../../../../schema/oppfolgingsplanSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getTokenXTokenFromRequest(req);
    const tiltakId = getTiltakIdFromRequest(req);
    const partialKommentar: Partial<Kommentar> = req.body;

    await saveTiltakCommentSM(tokenX, tiltakId, partialKommentar);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
