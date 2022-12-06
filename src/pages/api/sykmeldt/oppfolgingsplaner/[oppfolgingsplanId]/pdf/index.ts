import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorHandler } from "server/utils/errorHandler";
import getIdportenToken from "server/auth/idporten/idportenToken";
import { NextApiResponseOppfolgingsplanPdfSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanPdfSM";
import { fetchPdfSM } from "server/data/sykmeldt/fetchPdfSM";

const handler = nc<NextApiRequest, NextApiResponse>(errorHandler)
  .use(getIdportenToken)
  .use(fetchPdfSM)
  .get(
    async (req: NextApiRequest, res: NextApiResponseOppfolgingsplanPdfSM) => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="oppfolgingsplan.pdf"'
      );
      res.end(res.pdf);
    }
  );

export default handler;
