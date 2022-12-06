import { NextApiResponse } from "next";
import { isMockBackend } from "environments/publicEnv";
import { getOppfolgingsplanTokenX } from "server/utils/tokenX";
import { createOppfolgingsplanSM } from "server/service/oppfolgingsplanService";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";

export const postOpprettOppfolgingsplanSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const opprettOppfolgingsplanData: OpprettOppfoelgingsdialog = req.body;

  if (isMockBackend) {
    return next();
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(
      req.idportenToken
    );

    await createOppfolgingsplanSM(
      oppfolgingsplanTokenX,
      opprettOppfolgingsplanData
    );
  }

  next();
};
