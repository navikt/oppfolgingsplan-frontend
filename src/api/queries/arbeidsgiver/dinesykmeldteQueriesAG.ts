import { useApiBasePath, useNarmesteLederId } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { queryKeys } from "../queryKeys";

export const useDineSykmeldte = () => {
  const apiBasePath = useApiBasePath();
  const narmestelederId = useNarmesteLederId();

  const fetchDineSykmeldte = () =>
    get<Sykmeldt>(`${apiBasePath}/dinesykmeldte/${narmestelederId}`);

  return useQuery<Sykmeldt, Error>(
    [queryKeys.DINESYKMELDTE],
    fetchDineSykmeldte,
    {
      enabled: !!narmestelederId,
      useErrorBoundary: true,
    }
  );
};
