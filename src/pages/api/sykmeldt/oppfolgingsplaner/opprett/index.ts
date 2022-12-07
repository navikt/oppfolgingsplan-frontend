import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../environments/publicEnv";
import { getTokenXTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { createOppfolgingsplanSM } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { OpprettOppfoelgingsdialog } from "../../../../../schema/opprettOppfoelgingsdialogSchema";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getTokenXTokenFromRequest(req);
    const opprettOppfolgingsplanData: OpprettOppfoelgingsdialog = req.body;
    await createOppfolgingsplanSM(tokenX, opprettOppfolgingsplanData);

    res.status(200).end();
  }
};

export default beskyttetApi(handler);
