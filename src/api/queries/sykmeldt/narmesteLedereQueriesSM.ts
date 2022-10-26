import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { useSykmeldtFnr } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";

export const NARMESTELEDERE_SM = "narmesteledere-sykmeldt";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLeder[]>(`${apiBasePath}/narmesteledere/${sykmeldtFnr}`);

  return useQuery<NarmesteLeder[], ApiErrorException>(
    [NARMESTELEDERE_SM],
    fetchNarmesteLedere,
    {
      enabled: !!sykmeldtFnr,
    }
  );
};
