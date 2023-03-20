import { NextApiRequest, NextApiResponse } from "next";
import { SykmeldingDTO } from "../../../../../schema/sykmeldingSchema";
import { saveOppgave } from "../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../server/auth/beskyttetApi";
import { getSyfoOppfolgingsplanserviceTokenFromRequest } from "../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../server/utils/requestUtils";
import { Arbeidsoppgave } from "../../../../../types/oppfolgingsplan";
import { isMockBackend } from "../../../../../server/utils/serverEnv";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SykmeldingDTO[]>
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getSyfoOppfolgingsplanserviceTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const oppgave: Arbeidsoppgave = req.body;

    await saveOppgave(tokenX, oppfolgingsplanId, oppgave);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
