import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useSykmeldtFnr } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";
import useSWRImmutable from "swr/immutable";

export const NARMESTELEDERE_SM = "narmesteledere-sykmeldt";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLeder[]>(`${apiBasePath}/narmesteledere/${sykmeldtFnr}`);

  const { data, error } = useSWRImmutable(
    !!sykmeldtFnr ? NARMESTELEDERE_SM : null,
    fetchNarmesteLedere
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
