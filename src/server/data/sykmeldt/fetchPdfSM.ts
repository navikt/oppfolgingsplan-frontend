import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { handleQueryParamError } from "server/utils/errors";
import { getPdf } from "server/service/oppfolgingsplanService";
import { NextApiResponseOppfolgingsplanPdfSM } from "server/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanPdfSM";
import { defaultPdfMockData } from "server/data/mock/defaultData/oppfolgingsplanservice/defaultPdfMockData";

export const fetchPdfSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseOppfolgingsplanPdfSM,
  next: () => void
) => {
  const { oppfolgingsplanId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (isMockBackend) {
    //TODO: convert pdf mock to arraybuffer
    const encoder = new TextEncoder();
    res.pdf = encoder.encode(defaultPdfMockData.toString());
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    res.pdf = await getPdf(oppfolgingsplanTokenX, oppfolgingsplanId);
  }

  next();
};
