import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { postSlettArbeidsoppgaveSM } from "../../../../../../../server/data/sykmeldt/postSlettArbeidsoppgaveSM";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(getIdportenToken)
  .use(postSlettArbeidsoppgaveSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
