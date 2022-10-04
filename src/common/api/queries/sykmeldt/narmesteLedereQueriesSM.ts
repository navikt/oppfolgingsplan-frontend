import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useQuery } from "react-query";
import { ApiErrorException } from "@/common/api/axios/errors";
import { useSykmeldtFnr } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";

export const NARMESTELEDERE_SM = "narmesteledere-sykmeldt";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLeder[]>(`${apiBasePath}/narmesteledere/${sykmeldtFnr}`);

  return useQuery<NarmesteLeder[], ApiErrorException>(
    NARMESTELEDERE_SM,
    fetchNarmesteLedere,
    {
      enabled: !!sykmeldtFnr,
    }
  );
};
