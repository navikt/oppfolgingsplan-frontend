import { useApiBasePath, useNarmesteLederId } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { queryKeys } from "../queryKeys";
import { logger } from "@navikt/next-logger";

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
      onError: (err) => {
        logger.error(`useDineSykmeldte feiler ${err}}`);
      },
    }
  );
};
