import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { Tilgang } from "../../../schema/tilgangSchema";
import { useSykmeldtFnr } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";

export const TILGANG_SM = "tilgang-sykmeldt";

export const useTilgangSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchTilgang = () =>
    get<Tilgang>(`${apiBasePath}/tilgang/${sykmeldtFnr}`);

  return useQuery<Tilgang, ApiErrorException>([TILGANG_SM], fetchTilgang, {
    enabled: !!sykmeldtFnr,
  });
};
