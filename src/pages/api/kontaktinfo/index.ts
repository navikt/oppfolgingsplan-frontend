import { NextApiRequest, NextApiResponse } from "next";
import { getKontaktinfo } from "../../../server/service/oppfolgingsplanService";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromHeader } from "../../../server/utils/requestUtils";
import { beskyttetApi } from "../../../server/auth/beskyttetApi";
import { isMockBackend } from "../../../environments/publicEnv";
import getMockDb from "../../../server/data/mock/getMockDb";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb().kontaktinfo);
  } else {
    const syfoOppfolgingsplanServiceTokenX =
      await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const sykmeldtFnr = getSykmeldtFnrFromHeader(req);
    const kontaktinfo = await getKontaktinfo(
      syfoOppfolgingsplanServiceTokenX,
      sykmeldtFnr
    );

    res.status(200).json(kontaktinfo);
  }
};

export default beskyttetApi(handler);