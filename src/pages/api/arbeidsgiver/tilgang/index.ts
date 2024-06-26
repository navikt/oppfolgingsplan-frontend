import { NextApiRequest, NextApiResponse } from "next";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromHeader } from "../../../../server/utils/requestUtils";
import { getTilgang } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { TEST_SESSION_ID } from "../../../../api/axios/axios";
import { handleQueryParamError } from "../../../../server/utils/errors";
import { isMockBackend } from "../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    const sessionId = req.headers[TEST_SESSION_ID];

    if (typeof sessionId !== "string") {
      return handleQueryParamError(sessionId);
    }

    res.status(200).json(getMockDb(req).tilgang);
  } else {
    const tokenX = await getOppfolgingsplanBackendTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromHeader(req);
    const tilgangResponse = await getTilgang(tokenX, sykmeldtFnr);

    res.status(200).json(tilgangResponse);
  }
};

export default beskyttetApi(handler);
