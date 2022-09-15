import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend, isOpplaering } from "@/common/publicEnv";
import { NextApiResponseAG } from "@/server/data/types/next/NextApiResponseAG";
import activeMockAG from "@/server/data/mock/activeMockAG";
import { activeLabsMockAG } from "../mock/activeLabsMock";
import { getSykmeldt } from "@/server/service/sykmeldtService";
import { handleSchemaParsingError } from "@/server/utils/errors";
import { getTokenX } from "@/server/auth/tokenx";
import serverLogger from "@/server/utils/serverLogger";
import serverEnv from "@/server/utils/serverEnv";

export const fetchSykmeldtAG = async (
  req: IAuthenticatedRequest,
  res: NextApiResponseAG,
  next: () => void
) => {
  if (isMockBackend) {
    if (isOpplaering) {
      res.sykmeldt = activeLabsMockAG.sykmeldt!!;
    } else {
      res.sykmeldt = activeMockAG.sykmeldt!!;
    }
  } else {
    const idportenToken = req.idportenToken;

    const tokenx = await getTokenX(
      idportenToken,
      serverEnv.SYKMELDINGER_ARBEIDSGIVER_CLIENT_ID
    );

    serverLogger.info("Sykemeldinger AG tokenx exchange OK");

    const { narmestelederid } = <{ narmestelederid: string }>req.query;
    const sykmeldtRes = await getSykmeldt(narmestelederid, tokenx);

    if (sykmeldtRes.success) {
      res.sykmeldt = sykmeldtRes.data;
    } else {
      handleSchemaParsingError("Arbeidsgiver", "Sykmeldt", sykmeldtRes.error);
    }
  }

  next();
};
