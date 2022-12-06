import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import { deleteOppgave } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import getMockDb from "../mock/getMockDb";
import { logger } from "@navikt/next-logger";

export const postSlettArbeidsoppgaveSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { oppfolgingsplanId, arbeidsoppgaveId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (typeof arbeidsoppgaveId !== "string") {
    return handleQueryParamError(arbeidsoppgaveId);
  }

  if (isMockBackend) {
    const activeMock = getMockDb();

    const aktivPlan = activeMock.oppfolgingsplaner.find(
      (plan) => plan.id == Number(oppfolgingsplanId)
    );
    if (!aktivPlan) {
      logger.error(
        `postSlett: Det finnes ikke oppfølgingsplan med id ${oppfolgingsplanId} i mockdata`
      );
      throw new ApiErrorException(generalError());
    }
    const aktivPlanIndex = activeMock.oppfolgingsplaner.indexOf(aktivPlan);
    const filteredArbeidsoppgaveListe = aktivPlan.arbeidsoppgaveListe!!.filter(
      (arbeidsoppgave) =>
        arbeidsoppgave.arbeidsoppgaveId != Number(arbeidsoppgaveId)
    );

    activeMock.oppfolgingsplaner[aktivPlanIndex].arbeidsoppgaveListe =
      filteredArbeidsoppgaveListe;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await deleteOppgave(oppfolgingsplanTokenX, arbeidsoppgaveId);
  }

  next();
};
