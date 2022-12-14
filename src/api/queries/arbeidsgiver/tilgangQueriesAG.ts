import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { Tilgang } from "../../../schema/tilgangSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { useDineSykmeldte } from "./dinesykmeldteQueriesAG";

export const TILGANG_AG = "tilgang-arbeidsgiver";

export const useTilgangAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtData = useDineSykmeldte();

  const fetchTilgang = () =>
    get<Tilgang>(`${apiBasePath}/tilgang/${sykmeldtData.data?.fnr}`);

  return useQuery<Tilgang, ApiErrorException>([TILGANG_AG], fetchTilgang, {
    enabled: !!sykmeldtData.data?.fnr,
  });
};
