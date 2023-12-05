import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { Tilgang } from "../../../schema/tilgangSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { useDineSykmeldte } from "./dinesykmeldteQueriesAG";
import { queryKeys } from "../queryKeys";

export const useTilgangAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtData = useDineSykmeldte();

  const fetchTilgang = () =>
    get<Tilgang>(
      `${apiBasePath}/tilgang/${sykmeldtData.data?.fnr}`,
      "fetchTilgangAG",
    );

  return useQuery<Tilgang, ApiErrorException>({
    queryKey: [queryKeys.TILGANG],
    queryFn: fetchTilgang,
    enabled: !!sykmeldtData.data?.fnr,
    throwOnError: true,
  });
};
