import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorHandler } from "server/utils/errorHandler";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { postGodkjennOppfolgingsplanSM } from "server/data/sykmeldt/postGodkjennOppfolgingsplanSM";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(postGodkjennOppfolgingsplanSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
