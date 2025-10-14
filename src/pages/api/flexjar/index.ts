import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@navikt/next-logger";

import { beskyttetApi } from "../../../server/auth/beskyttetApi";
import getIdportenToken from "../../../server/auth/idporten/idportenToken";
import serverEnv, { isMockBackend } from "../../../server/utils/serverEnv";
import { requestOboToken } from "@navikt/oasis";
import { post } from "../../../api/axios/axios";
import { FlexJarTransportPayload } from "@navikt/flexjar-widget";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    return res.status(200).json({ id: "123" });
  }

  const { FLEXJAR_BACKEND_CLIENT_ID, FLEXJAR_HOST } = serverEnv;
  const idportenToken = await getIdportenToken(req);
  const data: FlexJarTransportPayload = req.body;
  const url = FLEXJAR_HOST + "/api/v2/feedback";

  const tokenX = await requestOboToken(
    idportenToken,
    FLEXJAR_BACKEND_CLIENT_ID,
  );
  if (!tokenX.ok) {
    logger.error(
      `Unable to exchange token for ${FLEXJAR_BACKEND_CLIENT_ID}, reason: ${tokenX.error.message}`,
    );
    return res.status(403).json({ message: "Forbidden" });
  }

  const id = await post(url, "flexjar", data, {
    accessToken: tokenX.token,
  });

  return res.status(200).json(id);
};

export default beskyttetApi(handler);
