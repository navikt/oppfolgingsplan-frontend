import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorHandler } from "server/utils/errorHandler";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { NextApiResponseTilgangSM } from "server/types/next/oppfolgingsplan/NextApiResponseTilgangSM";
import { fetchTilgangSM } from "server/data/sykmeldt/fetchTilgangSM";
import { Tilgang } from "../../../../schema/tilgangSchema";

const handler = nc<NextApiRequest, NextApiResponse<Tilgang>>(errorHandler)
  .use(getIdportenToken)
  .use(fetchTilgangSM)
  .get(async (req: NextApiRequest, res: NextApiResponseTilgangSM) => {
    res.status(200).json(res.tilgang);
  });

export default handler;
