import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { Tilgang } from "../../../schema/tilgangSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { useDineSykmeldte } from "./dinesykmeldteQueriesAG";
import { queryKeys } from "../queryKeys";
import { logger } from "@navikt/next-logger";

export const useTilgangAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtData = useDineSykmeldte();

  const fetchTilgang = () =>
    get<Tilgang>(`${apiBasePath}/tilgang/${sykmeldtData.data?.fnr}`);

  return useQuery<Tilgang, ApiErrorException>(
    [queryKeys.TILGANG],
    fetchTilgang,
    {
      enabled: !!sykmeldtData.data?.fnr,
      useErrorBoundary: true,
      onError: (err) => {
        logger.error(`useTilgangAG feiler ${err}`);
      },
    }
  );
};
