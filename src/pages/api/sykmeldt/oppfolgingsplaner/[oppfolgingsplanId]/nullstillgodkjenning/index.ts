import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { errorHandler } from "server/utils/errorHandler";
import { postNullstillGodkjenningSM } from "../../../../../../server/data/sykmeldt/postNullstillGodkjenningSM";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(postNullstillGodkjenningSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
