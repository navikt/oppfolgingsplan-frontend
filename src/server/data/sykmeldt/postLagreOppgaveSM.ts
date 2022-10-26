import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { handleQueryParamError } from "server/utils/errors";
import { saveOppgave } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { Arbeidsoppgave } from "../../../schema/oppfolgingsplanSchema";

export const postLagreOppgaveSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const oppgave: Arbeidsoppgave = req.body;
  const { oppfolgingsplanId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    await saveOppgave(oppfolgingsplanTokenX, oppfolgingsplanId, oppgave);
  }

  next();
};
