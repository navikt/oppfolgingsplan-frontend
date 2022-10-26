import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { ncOptions } from "server/utils/ncOptions";
import { postSlettArbeidsoppgaveSM } from "../../../../../../../server/data/sykmeldt/postSlettArbeidsoppgaveSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postSlettArbeidsoppgaveSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
