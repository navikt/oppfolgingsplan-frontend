import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import getIdportenToken from "@/server/auth/idporten/idportenToken";
import { fetchOppfolgingsplanerSM } from "@/server/data/sykmeldt/fetchOppfolgingsplanerSM";
import { NextApiResponseOppfolgingsplanSM } from "@/server/data/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import { OppfolgingsplanDTO } from "@/server/service/schema/oppfolgingsplanSchema";

const handler = nc<NextApiRequest, NextApiResponse<OppfolgingsplanDTO[]>>(
  ncOptions
)
  .use(getIdportenToken)
  .use(fetchOppfolgingsplanerSM)
  .get(async (req: NextApiRequest, res: NextApiResponseOppfolgingsplanSM) => {
    res.status(200).json(res.oppfolgingsplaner);
  });

export default withSentry(handler);
