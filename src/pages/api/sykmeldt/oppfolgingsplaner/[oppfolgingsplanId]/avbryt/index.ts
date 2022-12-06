import getIdportenToken from "server/auth/idporten/idportenToken";
import { postAvbrytOppfolgingsplanSM } from "server/data/sykmeldt/postAvbrytOppfolgingsplanSM";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getIdportenToken)
  .use(postAvbrytOppfolgingsplanSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
