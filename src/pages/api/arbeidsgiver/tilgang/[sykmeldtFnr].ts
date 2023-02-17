import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../environments/publicEnv";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromRequest } from "../../../../server/utils/requestUtils";
import { getTilgang } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { TEST_SESSION_ID } from "../../../../api/axios/axios";
import { handleQueryParamError } from "../../../../server/utils/errors";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    const sessionId = req.headers[TEST_SESSION_ID];

    if (typeof sessionId !== "string") {
      return handleQueryParamError(sessionId);
    }

    res.status(200).json(getMockDb(req).tilgang);
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromRequest(req);
    const tilgangResponse = await getTilgang(tokenX, sykmeldtFnr);

    res.status(200).json(tilgangResponse);
  }
};

export default beskyttetApi(handler);
