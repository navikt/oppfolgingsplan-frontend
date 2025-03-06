import { NextApiRequest, NextApiResponse } from "next";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import getMockDb from "../../../../server/data/mock/getMockDb";
import { getOppfolgingsplanBackendTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import serverEnv, { isMockBackend } from "../../../../server/utils/serverEnv";
import { logger } from "@navikt/next-logger";
import { get } from "../../../../api/axios/axios";
import {
  NarmesteLederDTO,
  narmesteLederSchema,
} from "../../../../schema/narmestelederSchema";
import { handleSchemaParsingError } from "../../../../server/utils/errors";
import { array } from "zod";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json(getMockDb(req).narmesteLedere);
  } else {
    logger.info("Henter narmeste ledere");
    const tokenX = await getOppfolgingsplanBackendTokenFromRequest(req);
    logger.info(`Fikk token: ${tokenX}`);
    const apiUrl = `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/narmesteleder/alle`;
    logger.info(`Kaller url: ${apiUrl}`);
    const data = await get<NarmesteLederDTO[]>(apiUrl, "getNarmesteLedere", {
      accessToken: tokenX,
    });
    logger.info(`Fikk respons: ${JSON.stringify(data)}`);

    if (!data) res.status(404).end();
    logger.info("Skal til å parse data");

    const response = array(narmesteLederSchema).safeParse(data);
    logger.info(`Respons: ${JSON.stringify(response)}`);

    if (response.success) {
      logger.info("Success! returnerer data");
      res.status(200).json(response.data);
    } else {
      logger.error("Feil ved parsing av data");
      handleSchemaParsingError("Sykmeldt", "NarmesteLedere", response.error);
    }
  }
};

export default beskyttetApi(handler);
