import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../environments/publicEnv";
import { OpprettOppfoelgingsdialog } from "../../../../../schema/opprettOppfoelgingsdialogSchema";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { createOppfolgingsplanAG } from "../../../../../server/service/oppfolgingsplanService";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json("123");
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const opprettOppfolgingsplanData: OpprettOppfoelgingsdialog = req.body;
    const id: number = await createOppfolgingsplanAG(
      tokenX,
      opprettOppfolgingsplanData
    );

    res.status(200).json(id);
  }
};

export default beskyttetApi(handler);
