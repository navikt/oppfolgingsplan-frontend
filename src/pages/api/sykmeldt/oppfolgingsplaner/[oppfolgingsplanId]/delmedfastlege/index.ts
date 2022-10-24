import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { postDelMedFastlegeSM } from "@/server/data/sykmeldt/postDelMedFastlegeSM";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(getIdportenToken)
  .use(postDelMedFastlegeSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default withSentry(handler);
