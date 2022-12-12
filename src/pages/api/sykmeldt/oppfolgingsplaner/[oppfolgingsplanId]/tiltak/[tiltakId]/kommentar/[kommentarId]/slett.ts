import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../../../../../environments/publicEnv";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getKommentarIdFromRequest } from "../../../../../../../../../server/utils/requestUtils";
import { deleteTiltakCommentSM } from "../../../../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../../../../server/auth/beskyttetApi";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const kommentarId = getKommentarIdFromRequest(req);

    await deleteTiltakCommentSM(tokenX, kommentarId);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
