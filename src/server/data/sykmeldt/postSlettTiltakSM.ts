import { NextApiResponse } from "next";
import { ApiErrorException, generalError } from "../../../api/axios/errors";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import { deleteTiltakSM } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { handleQueryParamError } from "server/utils/errors";
import getMockDb from "../mock/getMockDb";
import { logger } from "@navikt/next-logger";

export const postSlettTiltakSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { oppfolgingsplanId, tiltakId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (typeof tiltakId !== "string") {
    return handleQueryParamError(tiltakId);
  }

  if (isMockBackend) {
    const activeMock = getMockDb();

    const aktivPlan = activeMock.oppfolgingsplaner.find(
      (plan) => plan.id == Number(oppfolgingsplanId)
    );
    if (!aktivPlan) {
      logger.error(
        `Det finnes ikke oppfølgingsplan med id ${oppfolgingsplanId} i mockdata`
      );
      throw new ApiErrorException(generalError());
    }
    const aktivPlanIndex = activeMock.oppfolgingsplaner.indexOf(aktivPlan);
    const filteredTiltakListe = aktivPlan.tiltakListe!!.filter(
      (tiltak) => tiltak.tiltakId != Number(tiltakId)
    );

    activeMock.oppfolgingsplaner[aktivPlanIndex].tiltakListe =
      filteredTiltakListe;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await deleteTiltakSM(oppfolgingsplanTokenX, tiltakId);
  }

  next();
};
