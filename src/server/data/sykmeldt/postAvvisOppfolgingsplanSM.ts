import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { avvisOppfolgingsplanSM } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postAvvisOppfolgingsplanSM = async (
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
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    await avvisOppfolgingsplanSM(oppfolgingsplanTokenX, oppfolgingsplanId);
  }

  next();
};
