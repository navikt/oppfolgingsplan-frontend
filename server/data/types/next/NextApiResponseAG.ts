import { NextApiResponse } from "next";
import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { BrevDTO } from "@/server/service/schema/brevSchema";
import { DialogmoteData } from "types/shared/dialogmote";

export interface NextApiResponseAG extends NextApiResponse {
  sykmeldt: SykmeldtDTO;
  motebehov: MotebehovDTO;
  brevArray: BrevDTO[];
  dialogmoteData: DialogmoteData;
}
