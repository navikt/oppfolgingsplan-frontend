import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { postSlettKommentarSM } from "server/data/sykmeldt/postSlettKommentarSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postSlettKommentarSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
