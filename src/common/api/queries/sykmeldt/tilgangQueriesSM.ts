import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useQuery } from "react-query";
import { ApiErrorException } from "@/common/api/axios/errors";
import { Tilgang } from "../../../../schema/tilgangSchema";
import { useSykmeldtFnr } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";

export const TILGANG_SM = "tilgang-sykmeldt";

export const useTilgangSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchTilgang = () =>
    get<Tilgang>(`${apiBasePath}/tilgang/${sykmeldtFnr}`);

  return useQuery<Tilgang, ApiErrorException>(TILGANG_SM, fetchTilgang, {
    enabled: !!sykmeldtFnr,
  });
};
