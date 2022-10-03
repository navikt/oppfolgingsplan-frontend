import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import {NextApiResponse} from "next";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {post} from "@/common/api/axios/axios";
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

export const postLagreTiltakSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    const tiltak: Tiltak = req.body;
    const {oppfolgingsplanId} = req.query;

    if (isMockBackend) {
        return next();
    } else {
        const token = req.idportenToken;

        const oppfolgingsplanTokenXPromise = getTokenX(
            token,
            serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
        );

        const [oppfolgingsplanTokenX] = await Promise.all([oppfolgingsplanTokenXPromise]);
        serverLogger.info("Exchanging SM tokenx ok");

        await post(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreTiltak`, tiltak, {
            accessToken: oppfolgingsplanTokenX,
        })
    }

    next();
};
