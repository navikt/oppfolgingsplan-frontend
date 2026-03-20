import { logger } from "@navikt/next-logger";
import { requestOboToken } from "@navikt/oasis";
import { NextApiRequest, NextApiResponse } from "next";
import serverEnv, { isMockBackend } from "../../../server/utils/serverEnv";

import { beskyttetApi } from "../../../server/auth/beskyttetApi";
import getIdportenToken from "../../../server/auth/idporten/idportenToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const idportenToken = await getIdportenToken(req);

    const obo = await requestOboToken(idportenToken, serverEnv.LUMI_AUDIENCE);
    if (!obo.ok) {
      logger.error(`Lumi token exchange failed: ${obo.error.message}`);
      res.status(403).end();
      return;
    }

    const response = await fetch(
      `${serverEnv.LUMI_API_HOST}/api/tokenx/v1/feedback`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${obo.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      },
    );

    if (!response.ok) {
      logger.error(`Lumi API responded with ${response.status}`);
      res.status(response.status).end();
      return;
    }

    res.status(200).end();
  }
};

export default beskyttetApi(handler);
