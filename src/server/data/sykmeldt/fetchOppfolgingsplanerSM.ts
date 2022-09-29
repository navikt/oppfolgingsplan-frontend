import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import {
    NextApiResponseOppfolgingsplanSM
} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseOppfolgingsplanSM";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {getOppfolgingsplanerSM} from "@/server/service/oppfolgingsplanService";
import {handleSchemaParsingError} from "@/server/utils/errors";

export const fetchOppfolgingsplanerSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponseOppfolgingsplanSM,
    next: () => void
) => {
    if (isMockBackend) {
        res.oppfolgingsplaner = activeMockSM.oppfolgingsplaner
    } else {
        const token = req.idportenToken;

        const oppfolgingsplanTokenX = await getTokenX(
            token,
            serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
        );
        serverLogger.info("Exchanging SM tokenx ok");

        const oppfolgingsplanerRes = await getOppfolgingsplanerSM(oppfolgingsplanTokenX);
        serverLogger.info("Fetching DM data SM ok");

        if (oppfolgingsplanerRes.success) {
            res.oppfolgingsplaner = oppfolgingsplanerRes.data;
        } else {
            handleSchemaParsingError("Sykmeldt", "Oppfolgingsplan", oppfolgingsplanerRes.error);
        }
    }

    next();
};
