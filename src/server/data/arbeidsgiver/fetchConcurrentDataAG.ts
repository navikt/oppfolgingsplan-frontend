import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getMotebehovAG } from "@/server/service/motebehovService";
import { getBrevAG } from "@/server/service/brevService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";

export const fetchConcurrentDataAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.motebehov = activeLabsMockAG.motebehov;
      res.brevArray = activeLabsMockAG.brev;
    } else {
      res.motebehov = activeMockAG.motebehov;
      res.brevArray = activeMockAG.brev;
    }
  } else {
    const token = req.idportenToken;
    const motebehovTokenXPromise = getTokenX(
      token,
      serverEnv.SYFOMOTEBEHOV_CLIENT_ID
    );
    const isDialogmoteTokenXPromise = getTokenX(
      token,
      serverEnv.ISDIALOGMOTE_CLIENT_ID
    );

    const [motebehovTokenX, isDialogmoteTokenX] = await Promise.all([
      motebehovTokenXPromise,
      isDialogmoteTokenXPromise,
    ]);
    serverLogger.info("Exchanging AG tokenx ok");

    const motebehovPromise = getMotebehovAG(
      motebehovTokenX,
      res.sykmeldt.fnr,
      res.sykmeldt.orgnummer
    );
    const isDialogmotePromise = getBrevAG(isDialogmoteTokenX, res.sykmeldt.fnr);

    const [motebehovRes, isDialogmoteRes] = await Promise.all([
      motebehovPromise,
      isDialogmotePromise,
    ]);
    serverLogger.info("Fetching DM data AG ok");

    if (motebehovRes.success && isDialogmoteRes.success) {
      res.motebehov = motebehovRes.data;
      res.brevArray = isDialogmoteRes.data;
    } else if (!motebehovRes.success) {
      handleSchemaParsingError("Arbeidsgiver", "Motebehov", motebehovRes.error);
    } else if (!isDialogmoteRes.success) {
      handleSchemaParsingError(
        "Arbeidsgiver",
        "IsDialogmote",
        isDialogmoteRes.error
      );
    }
  }

  next();
};
