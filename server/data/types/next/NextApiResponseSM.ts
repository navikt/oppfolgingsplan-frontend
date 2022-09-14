import { NextApiResponse } from "next";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { BrevDTO } from "@/server/service/schema/brevSchema";
import { DialogmoteData } from "types/shared/dialogmote";

export interface NextApiResponseSM extends NextApiResponse {
  motebehov: MotebehovDTO;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}
