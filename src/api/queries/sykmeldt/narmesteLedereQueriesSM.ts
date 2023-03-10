import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLeder[]>(`${apiBasePath}/narmesteledere/${sykmeldtFnr}`);

  return useQuery<NarmesteLeder[], ApiErrorException>(
    [queryKeys.NARMESTELEDERE],
    fetchNarmesteLedere,
    {
      enabled: !!sykmeldtFnr,
      useErrorBoundary: true,
    }
  );
};
