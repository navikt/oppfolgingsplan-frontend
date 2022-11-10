import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { saveTiltakCommentSM } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { Kommentar } from "../../../schema/oppfolgingsplanSchema";

export const postLagreKommentarSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { tiltakId } = req.query;
  const partialKommentar: Partial<Kommentar> = req.body;

  if (typeof tiltakId !== "string") {
    return handleQueryParamError(tiltakId);
  }

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await saveTiltakCommentSM(
      oppfolgingsplanTokenX,
      tiltakId,
      partialKommentar
    );
  }

  next();
};
