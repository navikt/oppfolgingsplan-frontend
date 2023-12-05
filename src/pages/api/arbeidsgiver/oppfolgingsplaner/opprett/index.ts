import { NextApiRequest, NextApiResponse } from "next";
import { OpprettOppfoelgingsdialog } from "../../../../../schema/opprettOppfoelgingsdialogSchema";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { createOppfolgingsplanAG } from "../../../../../server/service/oppfolgingsplanService";
import { isMockBackend } from "../../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).send(123);
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const opprettOppfolgingsplanData: OpprettOppfoelgingsdialog = req.body;
    const id: number = await createOppfolgingsplanAG(
      tokenX,
      opprettOppfolgingsplanData,
    );

    res.status(200).send(id);
  }
};

export default beskyttetApi(handler);
