import { NextApiResponse } from "next";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "environments/publicEnv";
import serverLogger from "server/utils/serverLogger";
import { deleteTiltakSM } from "server/service/oppfolgingsplanService";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { handleQueryParamError } from "server/utils/errors";
import activeMockSM from "server/data/mock/activeMockSM";

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
    const aktivPlan = activeMockSM.oppfolgingsplaner.find(
      (plan) => plan.id == Number(oppfolgingsplanId)
    );
    const aktivPlanIndex = activeMockSM.oppfolgingsplaner.indexOf(aktivPlan!!);
    const filteredTiltakListe = aktivPlan!!.tiltakListe!!.filter(
      (tiltak) => tiltak.tiltakId != Number(tiltakId)
    );

    activeMockSM.oppfolgingsplaner[aktivPlanIndex].tiltakListe =
      filteredTiltakListe;
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    await deleteTiltakSM(oppfolgingsplanTokenX, tiltakId);
    serverLogger.info(`Attempting to delete tiltak with id: ${tiltakId}`);
  }

  next();
};
