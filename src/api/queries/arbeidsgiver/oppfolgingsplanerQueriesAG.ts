import { useQuery } from "@tanstack/react-query";
import { get } from "api/axios/axios";
import { useApiBasePath } from "hooks/routeHooks";
import { Oppfolgingsplan } from "schema/oppfolgingsplanSchema";
import {
  erOppfolgingsplanAktiv,
  finnTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import { ApiErrorException } from "api/axios/errors";
import { useDineSykmeldte } from "api/queries/arbeidsgiver/dinesykmeldteQueriesAG";

export const OPPFOLGINGSPLANER_AG = "oppfolgingsplaner-arbeidsgiver";

export const useOppfolgingsplanerAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldt = useDineSykmeldte();

  const sykmeldtFnr = sykmeldt.data?.fnr;

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner/`).then(
      (oppfolgingsplaner) => {
        return oppfolgingsplaner.filter(
          (plan) => plan.arbeidstaker.fnr === sykmeldtFnr
        );
      }
    );

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [OPPFOLGINGSPLANER_AG],
    fetchOppfolgingsplaner,
    { enabled: !!sykmeldtFnr }
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
