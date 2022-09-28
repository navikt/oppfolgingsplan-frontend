import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import {
    NextApiResponseNarmesteLedereSM
} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {handleSchemaParsingError} from "@/server/utils/errors";
import {getNarmesteLedere} from "@/server/service/oppfolgingsplanService";
import {NextApiResponseSykmeldingerSM} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseSykmeldingerSM";

export const fetchNarmesteLedereSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponseNarmesteLedereSM & NextApiResponseSykmeldingerSM,
    next: () => void
) => {
    if (isMockBackend) {
        res.narmesteLedere = activeMockSM.narmesteLedere
    } else {
        const token = req.idportenToken;

        const oppfolgingsplanTokenXPromise = getTokenX(
            token,
            serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
        );

        const [oppfolgingsplanTokenX] = await Promise.all([oppfolgingsplanTokenXPromise]);
        serverLogger.info("Exchanging SM tokenx ok");

        const narmesteLederePromise = getNarmesteLedere(oppfolgingsplanTokenX, res?.sykmeldinger?.pop()?.fnr ?? "");
        const [narmesteLedereRes] = await Promise.all([narmesteLederePromise]);
        serverLogger.info("Fetching DM data SM ok");

        if (narmesteLedereRes.success) {
            res.narmesteLedere = narmesteLedereRes.data;
        } else {
            handleSchemaParsingError("Sykmeldt", "Oppfolgingsplan", narmesteLedereRes.error);
        }
    }

    next();
};
