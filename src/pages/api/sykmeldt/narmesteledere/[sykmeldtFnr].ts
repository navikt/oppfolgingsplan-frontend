import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { fetchNarmesteLedereSM } from "@/server/data/sykmeldt/fetchNarmesteLedereSM";
import { NextApiResponseNarmesteLedereSM } from "@/server/data/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";

const handler = nc<NextApiRequest, NextApiResponse<NarmesteLeder[]>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchNarmesteLedereSM)
  .get(async (req: NextApiRequest, res: NextApiResponseNarmesteLedereSM) => {
    res.status(200).json(res.narmesteLedere);
  });

export default withSentry(handler);
