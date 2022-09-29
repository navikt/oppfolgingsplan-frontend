import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import {NextApiResponse} from "next";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {postOpprettOppfolgingsplan} from "@/server/service/oppfolgingsplanService";
import {RSOpprettOppfoelgingsdialog} from "@/types/oppfolgingsplanservice/RSOpprettOppfoelgingsdialog";

export const postOpprettOppfolgingsplanSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    const opprettOppfolgingsplanData: RSOpprettOppfoelgingsdialog = req.body;

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


        await postOpprettOppfolgingsplan(oppfolgingsplanTokenX, opprettOppfolgingsplanData);
    }

    next();
};
