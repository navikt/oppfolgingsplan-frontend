import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { Sykmelding } from "../../../../schema/sykmeldingSchema";
import { fetchVirksomhetSM } from "@/server/data/sykmeldt/fetchVirksomhetSM";
import { NextApiResponseVirksomhetSM } from "@/server/types/next/oppfolgingsplan/NextApiResponseVirksomhetSM";

const handler = nc<NextApiRequest, NextApiResponse<Sykmelding[]>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchVirksomhetSM)
  .get(async (req: NextApiRequest, res: NextApiResponseVirksomhetSM) => {
    res.status(200).json(res.virksomhet);
  });

export default withSentry(handler);
