import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";
import { logger } from "@navikt/next-logger";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchNarmesteLedere = () =>
    get<NarmesteLederDTO[]>(`${apiBasePath}/narmesteledere/${sykmeldtFnr}`);

  return useQuery<NarmesteLederDTO[], ApiErrorException>(
    [queryKeys.NARMESTELEDERE],
    fetchNarmesteLedere,
    {
      enabled: !!sykmeldtFnr,
      useErrorBoundary: true,
      onError: (err) => {
        logger.error(`useNarmesteLedereSM feiler ${err}}`);
      },
    }
  );
};
