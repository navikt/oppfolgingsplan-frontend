import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { isMockBackend } from "../../../../server/utils/serverEnv";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromHeader } from "../../../../server/utils/requestUtils";
import { getPerson } from "../../../../server/service/oppfolgingsplanService";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    const activeMock = getMockDb(req);
    res.status(200).json(activeMock.person.pilotUser);
  } else {
    const oppfolgingsplanBackendTokenX =
      await getOppfolgingsplanBackendTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromHeader(req);

    const personData = await getPerson(
      oppfolgingsplanBackendTokenX,
      sykmeldtFnr,
    );

    res.status(200).json(personData.pilotUser);
  }
};

export default beskyttetApi(handler);
