import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { fetchSykmeldingerSM } from "server/data/sykmeldt/fetchSykmeldingerSM";
import { NextApiResponseSykmeldingerSM } from "server/types/next/oppfolgingsplan/NextApiResponseSykmeldingerSM";
import { Sykmelding } from "../../../../schema/sykmeldingSchema";

const handler = nc<NextApiRequest, NextApiResponse<Sykmelding[]>>(ncOptions)
  .use(getIdportenToken)
  .use(fetchSykmeldingerSM)
  .get(async (req: NextApiRequest, res: NextApiResponseSykmeldingerSM) => {
    res.status(200).json(res.sykmeldinger);
  });

export default withSentry(handler);
