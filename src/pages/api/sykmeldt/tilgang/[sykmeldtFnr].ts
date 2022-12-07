import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../environments/publicEnv";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getTokenXTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromRequest } from "../../../../server/utils/requestUtils";
import { getTilgangSM } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb().tilgang);
  } else {
    const tokenX = await getTokenXTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromRequest(req);
    const tilgangResponse = await getTilgangSM(tokenX, sykmeldtFnr);

    res.status(200).json(tilgangResponse);
  }
};

export default beskyttetApi(handler);
