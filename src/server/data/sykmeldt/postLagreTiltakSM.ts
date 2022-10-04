import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { NextApiResponse } from "next";
import { handleQueryParamError } from "@/server/utils/errors";
import { saveTiltak } from "@/server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { TiltakDTO } from "@/server/service/schema/oppfolgingsplanSchema";

export const postLagreTiltakSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const tiltak: TiltakDTO = req.body;
  const { oppfolgingsplanId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
    await saveTiltak(oppfolgingsplanTokenX, oppfolgingsplanId, tiltak);
  }

  next();
};
