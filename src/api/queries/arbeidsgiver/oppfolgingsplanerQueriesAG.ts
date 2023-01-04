import { useQuery } from "@tanstack/react-query";
import { get } from "api/axios/axios";
import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import {
  erOppfolgingsplanAktiv,
  finnTidligereOppfolgingsplaner,
} from "../../../utils/oppfolgingplanUtils";
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

export const useAktiveOppfolgingsplanerAG = () => {
  const allePlaner = useOppfolgingsplanerAG();

  if (allePlaner.isSuccess) {
    const planer = allePlaner.data.filter((oppfolgingsplan) =>
      erOppfolgingsplanAktiv(oppfolgingsplan)
    );

    return {
      harAktiveOppfolgingsplaner: planer.length > 0,
      aktiveOppfolgingsplaner: planer,
    };
  }
  return {
    harAktiveOppfolgingsplaner: false,
    aktiveOppfolgingsplaner: [],
  };
};

export const useTidligereOppfolgingsplanerAG = () => {
  const allePlaner = useOppfolgingsplanerAG();

  if (allePlaner.isSuccess) {
    const planer = finnTidligereOppfolgingsplaner(allePlaner.data);
    return {
      harTidligereOppfolgingsplaner: planer.length > 0,
      tidligereOppfolgingsplaner: planer,
    };
  }
  return {
    harTidligereOppfolgingsplaner: false,
    tidligereOppfolgingsplaner: [],
  };
};

export const useChosenAktivOppfolgingsplanAG = ():
  | Oppfolgingsplan
  | undefined => {
  const allePlaner = useOppfolgingsplanerAG();
  const id = useOppfolgingsplanRouteId();

  if (allePlaner.isSuccess) {
    return allePlaner.data
      .filter((oppfolgingsplan) => erOppfolgingsplanAktiv(oppfolgingsplan))
      .find((plan) => plan.id === id);
  }
  return undefined;
};
