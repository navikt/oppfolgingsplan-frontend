import {NextApiResponse} from "next";
import {isMockBackend} from "@/common/publicEnv";
import serverLogger from "@/server/utils/serverLogger";
import {getOppfolgingsplanTokenX} from "@/server/utils/tokenX";
import {createOppfolgingsplanSM} from "@/server/service/oppfolgingsplanService";
import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {OpprettOppfoelgingsdialogDTO} from "@/server/service/schema/opprettOppfoelgingsdialogSchema";

export const postOpprettOppfolgingsplanSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    const opprettOppfolgingsplanData: OpprettOppfoelgingsdialogDTO = req.body;

    if (isMockBackend) {
        return next();
    } else {
        const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);
        await createOppfolgingsplanSM(oppfolgingsplanTokenX, opprettOppfolgingsplanData);
        serverLogger.info("Attempting to create oppfolgingsplan.ts", opprettOppfolgingsplanData);
    }

    next();
};
