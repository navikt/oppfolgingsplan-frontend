import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { useDineSykmeldte } from "./dinesykmeldteQueriesAG";
import { queryKeys } from "../queryKeys";

export const useIsPilotAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtData = useDineSykmeldte();

  const fetchPilotStatusAg = () =>
    get<boolean>(`${apiBasePath}/pilot`, "fetchPilotStatusAg", {
      personIdent: sykmeldtData.data?.fnr,
    });

  return useQuery<boolean, ApiErrorException>({
    queryKey: [queryKeys.PILOT],
    queryFn: fetchPilotStatusAg,
    enabled: !!sykmeldtData.data?.fnr,
    throwOnError: false,
  });
};
