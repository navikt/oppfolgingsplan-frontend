import { NextApiResponse } from "next";
import { isMockBackend } from "environments/publicEnv";
import { deleteTiltakCommentSM } from "server/service/oppfolgingsplanService";
import serverLogger from "server/utils/serverLogger";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { handleQueryParamError } from "server/utils/errors";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postSlettKommentarSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { oppfolgingsplanId, tiltakId, kommentarId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (typeof tiltakId !== "string") {
    return handleQueryParamError(tiltakId);
  }

  if (typeof kommentarId !== "string") {
    return handleQueryParamError(kommentarId);
  }

  if (isMockBackend) {
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await deleteTiltakCommentSM(oppfolgingsplanTokenX, kommentarId);
    serverLogger.info(`Attempting to delete comment with id: ${kommentarId}`);
  }

  next();
};
