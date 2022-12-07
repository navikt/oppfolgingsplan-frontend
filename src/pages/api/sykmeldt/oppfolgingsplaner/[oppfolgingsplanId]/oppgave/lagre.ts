import { NextApiRequest, NextApiResponse } from "next";
import { Sykmelding } from "../../../../../../schema/sykmeldingSchema";
import { isMockBackend } from "../../../../../../environments/publicEnv";
import { saveOppgave } from "../../../../../../server/service/oppfolgingsplanService";
import { beskyttetApi } from "../../../../../../server/auth/beskyttetApi";
import { Arbeidsoppgave } from "../../../../../../schema/oppfolgingsplanSchema";
import { getTokenXTokenFromRequest } from "../../../../../../server/auth/tokenx/getTokenXFromRequest";
import { getOppfolgingsplanIdFromRequest } from "../../../../../../server/utils/requestUtils";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Sykmelding[]>
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).end();
  } else {
    const tokenX = await getTokenXTokenFromRequest(req);
    const oppfolgingsplanId = getOppfolgingsplanIdFromRequest(req);
    const oppgave: Arbeidsoppgave = req.body;

    await saveOppgave(tokenX, oppfolgingsplanId, oppgave);
    res.status(200).end();
  }
};

export default beskyttetApi(handler);
