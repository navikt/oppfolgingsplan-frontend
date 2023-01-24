import { useApiBasePath, useNarmesteLederId } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { queryKeys } from "../queryKeys";

export const useDineSykmeldte = () => {
  const apiBasePath = useApiBasePath();
  const narmestelederId = useNarmesteLederId();

  const fetchDineSykmeldte = () =>
    get<Sykmeldt>(`${apiBasePath}/dinesykmeldte/${narmestelederId}`);

  return useQuery<Sykmeldt, ApiErrorException>(
    [queryKeys.DINESYKMELDTE],
    fetchDineSykmeldte,
    {
      enabled: !!narmestelederId,
      useErrorBoundary: true,
    }
  );
};
