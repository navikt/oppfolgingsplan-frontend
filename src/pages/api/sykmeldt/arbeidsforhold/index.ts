import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../server/utils/serverEnv";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { getArbeidsforhold } from "../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json({});
  } else {
    const tokenX = await getOppfolgingsplanBackendTokenFromRequest(req);
    const arbeidsforholdResponse = await getArbeidsforhold(tokenX);

    res.status(200).json(arbeidsforholdResponse);
  }
};

export default beskyttetApi(handler);
