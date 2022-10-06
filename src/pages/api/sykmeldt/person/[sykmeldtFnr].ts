import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { Tilgang } from "../../../../schema/tilgangSchema";
import { fetchPersonSM } from "@/server/data/sykmeldt/fetchPersonSM";
import { NextApiResponsePersonSM } from "@/server/types/next/oppfolgingsplan/NextApiResponsePersonSM";

const handler = nc<NextApiRequest, NextApiResponse<Tilgang>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchPersonSM)
  .get(async (req: NextApiRequest, res: NextApiResponsePersonSM) => {
    res.status(200).json(res.person);
  });

export default withSentry(handler);
