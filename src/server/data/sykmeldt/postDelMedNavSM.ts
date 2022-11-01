import { isMockBackend } from "environments/publicEnv";
import { delMedNavSM } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postDelMedNavSM = async (
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

    await delMedNavSM(oppfolgingsplanTokenX, oppfolgingsplanId);
  }

  next();
};
