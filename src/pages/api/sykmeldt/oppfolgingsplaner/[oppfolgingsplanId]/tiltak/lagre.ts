import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorHandler } from "server/utils/errorHandler";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { postLagreTiltakSM } from "server/data/sykmeldt/postLagreTiltakSM";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(postLagreTiltakSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
