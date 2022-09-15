import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import activeMockSM from "@/server/data/mock/activeMockSM";
import {
    NextApiResponseNarmesteLedereSM
} from "@/server/data/types/next/oppfolgingsplan/NextApiResponseNarmesteLedereSM";

export const fetchNarmesteLedereSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponseNarmesteLedereSM,
    next: () => void
) => {
    if (isMockBackend) {
        res.narmesteLedere = activeMockSM.narmesteLedere
    } else {
        // const token = req.idportenToken;
        // const motebehovTokenXPromise = getTokenX(
        //     token,
        //     serverEnv.SYFOMOTEBEHOV_CLIENT_ID
        // );
        // const isDialogmoteTokenXPromise = getTokenX(
        //     token,
        //     serverEnv.ISDIALOGMOTE_CLIENT_ID
        // );
        // const [motebehovTokenX, isDialogmoteTokenX] = await Promise.all([
        //     motebehovTokenXPromise,
        //     isDialogmoteTokenXPromise,
        // ]);
        // serverLogger.info("Exchanging SM tokenx ok");
        //
        // const motebehovPromise = getMotebehovSM(motebehovTokenX);
        // const isDialogmotePromise = getBrevSM(isDialogmoteTokenX);
        //
        // const [motebehovRes, isDialogmoteRes] = await Promise.all([
        //     motebehovPromise,
        //     isDialogmotePromise,
        // ]);
        // serverLogger.info("Fetching DM data SM ok");
        //
        // if (motebehovRes.success && isDialogmoteRes.success) {
        //     res.motebehov = motebehovRes.data;
        //     res.brevArray = isDialogmoteRes.data;
        // } else if (!motebehovRes.success) {
        //     handleSchemaParsingError("Sykmeldt", "Motebehov", motebehovRes.error);
        // } else if (!isDialogmoteRes.success) {
        //     handleSchemaParsingError(
        //         "Sykmeldt",
        //         "IsDialogmote",
        //         isDialogmoteRes.error
        //     );
        // }
    }

    next();
};
