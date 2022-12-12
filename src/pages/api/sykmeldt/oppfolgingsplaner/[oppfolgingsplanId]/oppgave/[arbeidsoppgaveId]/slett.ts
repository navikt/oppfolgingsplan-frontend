import { NextApiRequest, NextApiResponse } from "next";
import { Sykmelding } from "../../../../../../../schema/sykmeldingSchema";
import { isMockBackend } from "../../../../../../../environments/publicEnv";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../../../server/auth/tokenx/getTokenXFromRequest";
import {
  getArbeidsoppgaveIdFromRequest,
  getOppfolgingsplanIdFromRequest,
} from "../../../../../../../server/utils/requestUtils";
import { deleteOppgave } from "../../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../../server/auth/beskyttetApi";
import getMockDb from "../../../../../../../server/data/mock/getMockDb";
import {
  ApiErrorException,
  generalError,
} from "../../../../../../../api/axios/errors";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Sykmelding[]>
): Promise<void> => {
  const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
  const arbeidsoppgaveId = getArbeidsoppgaveIdFromRequest(req);

  if (isMockBackend) {
    const activeMock = getMockDb();

    const aktivPlan = activeMock.oppfolgingsplaner.find(
      (plan) => plan.id === Number(oppfolgingsplanId)
    );
    if (!aktivPlan) {
      throw new ApiErrorException(
        generalError(
          `postSlett: Det finnes ikke oppfølgingsplan med id ${oppfolgingsplanId} i mockdata`
        )
      );
    }
    const aktivPlanIndex = activeMock.oppfolgingsplaner.indexOf(aktivPlan);
    const filteredArbeidsoppgaveListe = aktivPlan.arbeidsoppgaveListe!!.filter(
      (arbeidsoppgave) =>
        arbeidsoppgave.arbeidsoppgaveId != Number(arbeidsoppgaveId)
    );

    activeMock.oppfolgingsplaner[aktivPlanIndex].arbeidsoppgaveListe =
      filteredArbeidsoppgaveListe;

    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);

    await deleteOppgave(tokenX, arbeidsoppgaveId);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
