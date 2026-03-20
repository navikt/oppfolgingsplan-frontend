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
    if (!obo.ok) throw new Error("Token exchange feilet");

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
      throw new Error(`Lumi API svarte med ${response.status}`);
    }

    res.status(200).end();
  }
};

export default beskyttetApi(handler);
