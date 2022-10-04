import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import { NextApiResponse } from "next";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { saveTiltakCommentSM } from "@/server/service/oppfolgingsplanService";
import { handleQueryParamError } from "@/server/utils/errors";
import { Kommentar } from "../../../schema/oppfolgingsplanSchema";

export const postLagreKommentarSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const body: Kommentar = req.body;
  const { kommentarId } = req.query;

  if (typeof kommentarId !== "string") {
    return handleQueryParamError(kommentarId);
  }

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
    await saveTiltakCommentSM(oppfolgingsplanTokenX, kommentarId, body);
  }

  next();
};
