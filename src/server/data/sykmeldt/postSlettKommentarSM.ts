import {IAuthenticatedRequest} from "../../api/IAuthenticatedRequest";
import {isMockBackend} from "@/common/publicEnv";
import {NextApiResponse} from "next";
import activeMockSM from "@/server/data/mock/activeMockSM";

;

export const postSlettKommentarSM = async (
    req: IAuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
) => {
    if (isMockBackend) {
        const {oppfolgingsplanId, tiltakId, kommentarId} = req.query;

        // console.log(activeMockSM.oppfolgingsplaner[0].tiltakListe[1].kommentarer)

        const aktivPlan = activeMockSM.oppfolgingsplaner.find(plan => plan.id == Number(oppfolgingsplanId))
        const aktivtTiltak = aktivPlan?.tiltakListe.find(tiltak => tiltak.tiltakId == Number(tiltakId));
        const kommentarer = aktivtTiltak?.kommentarer?.filter(kommentar => kommentar.id != Number(kommentarId))

        activeMockSM.oppfolgingsplaner.find(plan => plan.id == Number(oppfolgingsplanId))!!.tiltakListe.find(tiltak => tiltak.tiltakId == Number(tiltakId))!!.kommentarer = kommentarer

        console.log(activeMockSM.oppfolgingsplaner[0].tiltakListe[1].kommentarer)

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
