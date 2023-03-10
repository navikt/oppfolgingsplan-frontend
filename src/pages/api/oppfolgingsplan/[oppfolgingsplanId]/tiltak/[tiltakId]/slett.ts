import { NextApiRequest, NextApiResponse } from "next";
import {
  getOppfolgingsplanIdFromRequest,
  getTiltakIdFromRequest,
} from "../../../../../../server/utils/requestUtils";
import getMockDb from "../../../../../../server/data/mock/getMockDb";
import {
  ApiErrorException,
  generalError,
} from "../../../../../../api/axios/errors";
import { beskyttetApi } from "../../../../../../server/auth/beskyttetApi";
import { deleteTiltak } from "../../../../../../server/service/oppfolgingsplanService";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { isMockBackend } from "../../../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
  const tiltakId = getTiltakIdFromRequest(req);

  if (isMockBackend) {
    const activeMock = getMockDb(req);

    const aktivPlan = activeMock.oppfolgingsplaner.find(
      (plan) => plan.id === Number(oppfolgingsplanId)
    );
    if (!aktivPlan) {
      throw new ApiErrorException(
        generalError(
          `Det finnes ikke oppfølgingsplan med id ${oppfolgingsplanId} i mockdata`
        )
      );
    }
    const aktivPlanIndex = activeMock.oppfolgingsplaner.indexOf(aktivPlan);
    activeMock.oppfolgingsplaner[aktivPlanIndex].tiltakListe =
      aktivPlan.tiltakListe?.filter(
        (tiltak) => tiltak.tiltakId !== Number(tiltakId)
      );
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);

    await deleteTiltak(tokenX, tiltakId);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
