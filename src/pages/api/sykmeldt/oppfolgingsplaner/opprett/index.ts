import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { postOpprettOppfolgingsplanSM } from "@/server/data/sykmeldt/postOpprettOppfolgingsplanSM";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postOpprettOppfolgingsplanSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
