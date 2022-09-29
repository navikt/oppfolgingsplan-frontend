import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import {NextApiResponse} from "next";

export const postSlettTiltakSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    if (isMockBackend) {
        // const {oppfolgingsplanId, tiltakId} = req.query;
        //
        // const aktivPlan = activeMockSM.oppfolgingsplaner.find(plan => plan.id == Number(oppfolgingsplanId))
        // const aktivPlanIndex = activeMockSM.oppfolgingsplaner.indexOf(aktivPlan!!)
        // const filteredTiltakListe = aktivPlan!!.tiltakListe.filter(tiltak => tiltak.tiltakId != Number(tiltakId))

        // activeMockSM.oppfolgingsplaner[aktivPlanIndex].tiltakListe = filteredTiltakListe

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
