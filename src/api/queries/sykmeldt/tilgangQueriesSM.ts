import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { Tilgang } from "../../../schema/tilgangSchema";
import { useSykmeldtFnr } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import useSWRImmutable from "swr/immutable";

export const TILGANG_SM = "tilgang-sykmeldt";

export const useTilgangSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchTilgang = () =>
    get<Tilgang>(`${apiBasePath}/tilgang/${sykmeldtFnr}`);

  const { data, error } = useSWRImmutable(
    !!sykmeldtFnr ? TILGANG_SM : null,
    fetchTilgang
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
