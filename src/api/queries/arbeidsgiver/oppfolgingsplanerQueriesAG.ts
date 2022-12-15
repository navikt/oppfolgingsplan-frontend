import { useQuery } from "@tanstack/react-query";
import { get } from "api/axios/axios";
import { useApiBasePath } from "hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { erOppfolgingsplanAktiv } from "../../../utils/oppfolgingplanUtils";
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

export const useAktivePlanerAG = (): Oppfolgingsplan[] => {
  const allePlaner = useOppfolgingsplanerAG();

  if (allePlaner.isSuccess) {
    return allePlaner.data.filter((oppfolgingsplan) => {
      return erOppfolgingsplanAktiv(oppfolgingsplan);
    });
  }
  return [];
};
