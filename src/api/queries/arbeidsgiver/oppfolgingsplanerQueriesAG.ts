import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "api/axios/axios";
import {useApiBasePath, useOppfolgingsplanApiPath, useOppfolgingsplanRouteId} from "hooks/routeHooks";
import { OpprettOppfoelgingsdialog } from "schema/opprettOppfoelgingsdialogSchema";
import {
  erOppfolgingsplanAktiv,
  finnNyesteTidligereOppfolgingsplanMedVirksomhet,
  finnTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import { ApiErrorException } from "api/axios/errors";
import { useDineSykmeldte } from "api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

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

export const useOpprettOppfolgingsplanAG = () => {
  const sykmeldt = useDineSykmeldte();
  const oppfolgingsplaner = useOppfolgingsplanerAG();

  const apiBasePath = useApiBasePath();
  const apiOppfolgingsplanPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const opprettOppfolgingsplan = async (kopierTidligerePlan: boolean) => {
    if (!oppfolgingsplaner.isSuccess || !sykmeldt.isSuccess) {
      return;
    }

    const opprettOppfoelgingsplan: OpprettOppfoelgingsdialog = {
      sykmeldtFnr: sykmeldt.data.fnr,
      virksomhetsnummer: sykmeldt.data.orgnummer,
    };
    if (kopierTidligerePlan) {
      const oppfolgingsplan = finnNyesteTidligereOppfolgingsplanMedVirksomhet(
        oppfolgingsplaner.data,
        sykmeldt.data.orgnummer
      );
      if (oppfolgingsplan) {
        await post(`${apiOppfolgingsplanPath}/${oppfolgingsplan.id}/kopier`);
      } else {
        //Om det skjedde noe rart og man ikke fikk opp den tidligere planen, så bare lag en ny.
        await post(
          `${apiBasePath}/oppfolgingsplaner/opprett`,
          opprettOppfoelgingsplan
        );
      }
    } else {
      await post(
        `${apiBasePath}/oppfolgingsplaner/opprett`,
        opprettOppfoelgingsplan
      );
    }

    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(opprettOppfolgingsplan);
};

export const useAktivPlanAG = (): Oppfolgingsplan | undefined => {
  const id = useOppfolgingsplanRouteId();
  const allePlaner = useOppfolgingsplanerAG();

  if (allePlaner.isSuccess) {
    return allePlaner.data.find((plan) => plan.id === id);
  }

  return undefined;
};