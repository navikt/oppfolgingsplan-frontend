import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useKontaktinfo } from "../../../api/queries/kontaktinfo/kontaktinfoQueries";
import { useNarmesteLederId } from "../../../hooks/routeHooks";

function queryKeyHasDismissedSMIsReservertInfoForNLID(narmesteLederId: string) {
  return ["AGHasDismissedSMIsReservertInfoForNLID", narmesteLederId];
}

function useShowSMIsReservertInfoForAG() {
  const queryClient = useQueryClient();

  const narmesteLederId = useNarmesteLederId()!;
  const sykmeldtesKontaktinfo = useKontaktinfo();

  const [showSMIsReservertInfo, setShowSMIsReservertInfo] = useState(false);

  const { data: hasDismissedSMIsReservertInfo } = useQuery({
    queryKey: queryKeyHasDismissedSMIsReservertInfoForNLID(narmesteLederId),
    initialData: false,
  });

  useEffect(() => {
    if (
      sykmeldtesKontaktinfo.isSuccess &&
      !sykmeldtesKontaktinfo.data.skalHaVarsel &&
      !hasDismissedSMIsReservertInfo
    ) {
      setShowSMIsReservertInfo(true);
    }
  }, [
    sykmeldtesKontaktinfo.isSuccess,
    sykmeldtesKontaktinfo.data?.skalHaVarsel,
    hasDismissedSMIsReservertInfo,
  ]);

  const dismissSMIsReservertInfo = () => {
    queryClient.setQueryData(
      queryKeyHasDismissedSMIsReservertInfoForNLID(narmesteLederId),
      () => true,
    );
    setShowSMIsReservertInfo(false);
  };

  return {
    showSMIsReservertInfo,
    dismissSMIsReservertInfo,
  };
}

export default useShowSMIsReservertInfoForAG;
