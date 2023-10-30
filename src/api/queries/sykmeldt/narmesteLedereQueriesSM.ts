import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLederDTO[]>(
      `${apiBasePath}/narmesteledere/${sykmeldtFnr}`,
      "fetchNarmesteLedereSM"
    );

  return useQuery({
    queryKey: [queryKeys.NARMESTELEDERE],
    queryFn: fetchNarmesteLedere,
    enabled: !!sykmeldtFnr,
    throwOnError: true,
  });
};
