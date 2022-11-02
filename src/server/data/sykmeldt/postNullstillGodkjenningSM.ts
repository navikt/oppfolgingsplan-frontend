import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { nullstillGodkjenningSM } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postNullstillGodkjenningSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { oppfolgingsplanId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await nullstillGodkjenningSM(oppfolgingsplanTokenX, oppfolgingsplanId);
  }

  next();
};
