import getIdportenToken from "server/auth/idporten/idportenToken";
import { postDelMedFastlegeSM } from "server/data/sykmeldt/postDelMedFastlegeSM";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getIdportenToken)
  .use(postDelMedFastlegeSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
