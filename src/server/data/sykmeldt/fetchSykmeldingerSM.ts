import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";
import { isMockBackend } from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import {NextApiResponseSykmeldingerSM} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseSykmeldingerSM";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {getSykmeldingerSM} from "@/server/service/oppfolgingsplanService";
import {handleSchemaParsingError} from "@/server/utils/errors";

export const fetchSykmeldingerSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponseSykmeldingerSM,
    next: () => void
) => {
    if (isMockBackend) {
        res.sykmeldinger = activeMockSM.sykmeldinger
    } else {
        const token = req.idportenToken;

        const oppfolgingsplanTokenX = await getTokenX(
            token,
            serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
        );
        serverLogger.info("Exchanging SM tokenx ok");

        const sykmeldingerRes = await getSykmeldingerSM(oppfolgingsplanTokenX);
        serverLogger.info("Fetching DM data SM ok");

        if (sykmeldingerRes.success) {
            res.sykmeldinger = sykmeldingerRes.data;
        } else {
            handleSchemaParsingError("Sykmeldt", "Oppfolgingsplan", sykmeldingerRes.error);
        }
    }

    next();
};
