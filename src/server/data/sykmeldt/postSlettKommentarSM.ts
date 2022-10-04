import { NextApiResponse } from "next";
import { isMockBackend } from "@/common/publicEnv";
import { deleteTiltakCommentSM } from "@/server/service/oppfolgingsplanService";
import serverLogger from "@/server/utils/serverLogger";
import { getOppfolgingsplanTokenX } from "@/server/utils/tokenX";
import { handleQueryParamError } from "@/server/utils/errors";
import { IAuthenticatedRequest } from "../../api/IAuthenticatedRequest";

export const postSlettKommentarSM = async (
  req: IAuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { oppfolgingsplanId, tiltakId, kommentarId } = req.query;

  if (typeof oppfolgingsplanId !== "string") {
    return handleQueryParamError(oppfolgingsplanId);
  }

  if (typeof tiltakId !== "string") {
    return handleQueryParamError(tiltakId);
  }

  if (typeof kommentarId !== "string") {
    return handleQueryParamError(kommentarId);
  }

  if (isMockBackend) {
    // const {oppfolgingsplanId, tiltakId, kommentarId} = req.query;
    // console.log(activeMockSM.oppfolgingsplaner[0].tiltakListe[1].kommentarer)
    // const aktivPlan = activeMockSM.oppfolgingsplaner.find(plan => plan.id == Number(oppfolgingsplanId))
    // const aktivtTiltak = aktivPlan?.tiltakListe?.find(tiltak => tiltak.tiltakId == Number(tiltakId));
    // const kommentarer = aktivtTiltak?.kommentarer?.filter(kommentar => kommentar.id != Number(kommentarId))
    //
    // activeMockSM.oppfolgingsplaner.find(plan => plan.id == Number(oppfolgingsplanId))!!.tiltakListe.find(tiltak => tiltak.tiltakId == Number(tiltakId))!!.kommentarer = kommentarer
    //
    // console.log(activeMockSM.oppfolgingsplaner[0].tiltakListe[1].kommentarer)
  } else {
    const oppfolgingsplanTokenX = await getOppfolgingsplanTokenX(req);

    await deleteTiltakCommentSM(oppfolgingsplanTokenX, kommentarId);
    serverLogger.info(`Attempting to delete comment with id: ${kommentarId}`);
  }

  next();
};
