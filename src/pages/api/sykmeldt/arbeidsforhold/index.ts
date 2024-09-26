import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import { getArbeidsforhold } from "../../../../server/service/oppfolgingsplanService";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getSykmeldtFnrFromHeader } from "../../../../server/utils/requestUtils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const tokenX = await getOppfolgingsplanBackendTokenFromRequest(req);
  const sykmeldtFnr = getSykmeldtFnrFromHeader(req);

  const arbeidsforhold = await getArbeidsforhold(tokenX, sykmeldtFnr);
  res.status(200).json(arbeidsforhold);
};

export default beskyttetApi(handler);
