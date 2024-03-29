import { NextApiRequest, NextApiResponse } from "next";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { createOppfolgingsplanSM } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { OpprettOppfoelgingsdialog } from "../../../../../schema/opprettOppfoelgingsdialogSchema";
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
    const id: number = await createOppfolgingsplanSM(
      tokenX,
      opprettOppfolgingsplanData,
    );

    res.status(200).send(id);
  }
};

export default beskyttetApi(handler);
