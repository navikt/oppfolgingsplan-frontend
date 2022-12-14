import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../environments/publicEnv";
import { getNarmesteLedere } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromRequest } from "../../../../server/utils/requestUtils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb().narmesteLedere);
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromRequest(req);
    const narmesteLedereResponse = await getNarmesteLedere(tokenX, sykmeldtFnr);

    res.status(200).json(narmesteLedereResponse);
  }
};

export default beskyttetApi(handler);
