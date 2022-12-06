import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { errorHandler } from "server/utils/errorHandler";
import { postAvvisOppfolgingsplanSM } from "../../../../../../server/data/sykmeldt/postAvvisOppfolgingsplanSM";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(postAvvisOppfolgingsplanSM)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).end();
  });

export default handler;
