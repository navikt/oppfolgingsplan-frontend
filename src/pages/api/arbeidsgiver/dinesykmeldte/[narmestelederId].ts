import { NextApiRequest, NextApiResponse } from "next";
import { isMockBackend } from "../../../../environments/publicEnv";
import { getDineSykmeldteTokenFromRequest } from "../../../../server/auth/tokenx/getTokenXFromRequest";
import { beskyttetApi } from "../../../../server/auth/beskyttetApi";
import serverEnv from "../../../../server/utils/serverEnv";
import { sykmeldtSchema } from "../../../../schema/sykmeldtSchema";
import { get } from "api/axios/axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (isMockBackend) {
    res.status(200).json({
      narmestelederId: "123",
      orgnummer: "000111222",
      fnr: "01010112345",
      navn: "Kreativ Hatt",
      aktivSykmelding: true,
    });
  } else {
    const accessToken = await getDineSykmeldteTokenFromRequest(req);

    const { narmestelederid } = <{ narmestelederid: string }>req.query;

    const sykmeldtResponse = sykmeldtSchema.safeParse(
      await get(
        `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/v2/dinesykmeldte/${narmestelederid}`,
        { accessToken }
      )
    );
    res.status(200).json(sykmeldtResponse);
  }
};

export default beskyttetApi(handler);
