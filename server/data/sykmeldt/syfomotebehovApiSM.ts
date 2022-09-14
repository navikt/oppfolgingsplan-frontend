import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { getTokenX } from "@/server/auth/tokenx";
import { MotebehovSvarRequest } from "types/shared/motebehov";

export const postMotebehovSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (isMockBackend) {
    return next();
  } else {
    const token = req.idportenToken;
    const motebehovTokenX = await getTokenX(
      token,
      serverEnv.SYFOMOTEBEHOV_CLIENT_ID
    );

    const svar: MotebehovSvarRequest = req.body;
    await post(
      `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov`,
      svar,
      {
        accessToken: motebehovTokenX,
      }
    );
  }

  next();
};
