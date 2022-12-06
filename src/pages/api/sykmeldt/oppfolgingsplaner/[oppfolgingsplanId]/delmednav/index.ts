import getIdportenToken from "server/auth/idporten/idportenToken";
import { postDelMedNavSM } from "server/data/sykmeldt/postDelMedNavSM";
import { errorHandler } from "server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(postDelMedNavSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
