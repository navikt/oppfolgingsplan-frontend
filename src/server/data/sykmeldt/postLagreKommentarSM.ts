import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import {NextApiResponse} from "next";

export const postLagreKommentarSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    if (isMockBackend) {
        return next();
    } else {
        // const token = req.idportenToken;
        // const motebehovTokenX = await getTokenX(
        //     token,
        //     serverEnv.SYFOMOTEBEHOV_CLIENT_ID
        // );
        //
        // const svar: MotebehovSvarRequest = req.body;
        // await post(
        //     `${serverEnv.SYFOMOTEBEHOV_HOST}/syfomotebehov/api/v3/arbeidstaker/motebehov`,
        //     svar,
        //     {
        //         accessToken: motebehovTokenX,
        //     }
        // );
    }

    next();
};
