import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { fetchNarmesteLedereExternalSM } from "server/data/sykmeldt/fetchNarmesteLedereExternalSM";
import { NextApiResponseNarmesteLedereSM } from "server/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";
import { errorHandler } from "server/utils/errorHandler";

const handler = nc<NextApiRequest, NextApiResponse<NarmesteLeder[]>>(
  errorHandler
)
  .use(getIdportenToken)
  .use(fetchNarmesteLedereExternalSM)
  .get(async (req: NextApiRequest, res: NextApiResponseNarmesteLedereSM) => {
    res.status(200).json(res.narmesteLedere);
  });

export default handler;
