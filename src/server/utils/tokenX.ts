import {IAuthenticatedRequest} from "@/server/api/IAuthenticatedRequest";
import {getTokenX} from "@/server/auth/tokenx";
import serverEnv from "@/server/utils/serverEnv";
import serverLogger from "@/server/utils/serverLogger";
import {accessDeniedError, ApiErrorException} from "@/common/api/axios/errors";

export const getOppfolgingsplanTokenX = async (req: IAuthenticatedRequest): Promise<string> => {
    if (!req.idportenToken) {
        throw new ApiErrorException(
            accessDeniedError(
                new Error("Invalid idporten token.")
            )
        );
    }

    const oppfolgingsplanTokenX = getTokenX(
        req.idportenToken,
        serverEnv.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID
    );

    serverLogger.info("Exchanging SM tokenx ok");

    return oppfolgingsplanTokenX;
}