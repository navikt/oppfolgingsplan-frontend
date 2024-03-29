import { NextApiRequest, NextApiResponse } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getTiltakIdFromRequest } from "../../../../../../../server/utils/requestUtils";
import { saveTiltakComment } from "../../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../../server/auth/beskyttetApi";
import { isMockBackend } from "../../../../../../../server/utils/serverEnv";
import { KommentarDTO } from "../../../../../../../schema/oppfolgingsplanSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const tiltakId = getTiltakIdFromRequest(req);
    const partialKommentar: Partial<KommentarDTO> = req.body;

    await saveTiltakComment(tokenX, tiltakId, partialKommentar);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
