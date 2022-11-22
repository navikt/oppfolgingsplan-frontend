import { isMockBackend } from "environments/publicEnv";
import { NextApiResponse } from "next";
import activeMockSM from "server/data/mock/activeMockSM";
import { deleteOppgave } from "server/service/oppfolgingsplanService";
import { handleQueryParamError } from "server/utils/errors";
import serverLogger from "server/utils/serverLogger";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

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
    const aktivPlan = activeMockSM.oppfolgingsplaner.find(
      (plan) => plan.id == Number(oppfolgingsplanId)
    );
    if (!aktivPlan) {
      throw new ApiErrorException(
        generalError(
          new Error(
            `Det finnes ikke oppfølgingsplan med id ${oppfolgingsplanId} i mockdata`
          )
        )
      );
    }
    const aktivPlanIndex = activeMockSM.oppfolgingsplaner.indexOf(aktivPlan);
    const filteredArbeidsoppgaveListe = aktivPlan.arbeidsoppgaveListe!!.filter(
      (arbeidsoppgave) =>
        arbeidsoppgave.arbeidsoppgaveId != Number(arbeidsoppgaveId)
    );

    activeMockSM.oppfolgingsplaner[aktivPlanIndex].arbeidsoppgaveListe =
      filteredArbeidsoppgaveListe;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await deleteOppgave(oppfolgingsplanTokenX, arbeidsoppgaveId);
    serverLogger.info(
      `Attempting to delete tiltak with id: ${arbeidsoppgaveId}`
    );
  }

  next();
};
