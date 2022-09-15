import { mapReferater } from "@/server/data/common/mapReferater";
import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";
import { BrevDTO } from "@/server/service/schema/brevSchema";
import { DialogmoteData } from "types/shared/dialogmote";

export const mapDialogmoteData = (
  motebehov: MotebehovDTO,
  brevArray?: BrevDTO[],
  sykmeldt?: SykmeldtDTO
): DialogmoteData => {
  const brevArraySorted = brevArray?.sort(
    (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );
  const latestBrev = brevArraySorted ? brevArraySorted[0] : undefined;
  const isLastestBrevReferat =
    latestBrev?.brevType === "REFERAT" ||
    latestBrev?.brevType === "REFERAT_ENDRET";
  const isLatestBrevOngoingMoteinnkalling =
    latestBrev?.brevType === "INNKALT" ||
    latestBrev?.brevType === "NYTT_TID_STED";

  return {
    motebehov: mapMotebehov(motebehov, isLatestBrevOngoingMoteinnkalling),
    moteinnkalling: !isLastestBrevReferat ? latestBrev : undefined,
    referater: mapReferater(brevArraySorted),
    sykmeldt: sykmeldt,
  };
};
