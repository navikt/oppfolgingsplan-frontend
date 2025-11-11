import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";

export const useIsPilotSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchPilotStatusAg = () =>
    get<boolean>(`${apiBasePath}/pilot`, "fetchPilotStatusSm", {
      personIdent: sykmeldtFnr!,
    });

  return useQuery<boolean, ApiErrorException>({
    queryKey: [queryKeys.PILOT],
    queryFn: fetchPilotStatusAg,
    enabled: !!sykmeldtFnr,
    throwOnError: false,
  });
};
