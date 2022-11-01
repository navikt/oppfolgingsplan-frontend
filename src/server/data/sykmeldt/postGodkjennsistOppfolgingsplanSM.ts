import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { godkjennsistOppfolgingsplanSM } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { GodkjennsistPlanData } from "../../../schema/godkjennsistPlanSchema";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postGodkjennsistOppfolgingsplanSM = async (
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

    const data: GodkjennsistPlanData = req.body;

    await godkjennsistOppfolgingsplanSM(
      oppfolgingsplanTokenX,
      oppfolgingsplanId,
      data
    );
  }

  next();
};
