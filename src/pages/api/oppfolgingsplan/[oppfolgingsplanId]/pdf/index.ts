import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../../environments/publicEnv";
import { defaultPdfMockData } from "../../../../../server/data/mock/defaultData/oppfolgingsplanservice/defaultPdfMockData";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../server/utils/requestUtils";
import { getPdf } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    const encoder = new TextEncoder();
    res.status(200).json(encoder.encode(defaultPdfMockData.toString()));
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);

    const pdf = await getPdf(tokenX, oppfolgingsplanId);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="oppfolgingsplan.pdf"'
    );
    res.end(pdf);
  }
};

export default beskyttetApi(handler);
