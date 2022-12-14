import { get } from "api/axios/axios";
import { useApiBasePath } from "hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";

export const OPPFOLGINGSPLANER_AG = "oppfolgingsplaner-arbeidsgiver";

export const useOppfolgingsplanerAG = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [OPPFOLGINGSPLANER_AG],
    fetchOppfolgingsplaner
  );
};
