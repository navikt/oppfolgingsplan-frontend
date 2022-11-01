import { NextApiResponse } from "next";
import { isMockBackend } from "environments/publicEnv";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { godkjennOppfolgingsplanSM } from "server/service/oppfolgingsplanService";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { handleQueryParamError } from "server/utils/errors";
import { GodkjennPlanData } from "../../../schema/godkjennPlanSchema";

export const postGodkjennOppfolgingsplanSM = async (
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

    const data: GodkjennPlanData = req.body;

    await godkjennOppfolgingsplanSM(
      oppfolgingsplanTokenX,
      oppfolgingsplanId,
      data
    );
  }

  next();
};
