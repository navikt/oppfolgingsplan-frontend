import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../../axios/axios";
import {
  useApiBasePath,
  useLandingUrl,
  useNarmesteLederId,
  useOppfolgingsplanApiPath,
} from "../../../hooks/routeHooks";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";
import {
  erOppfolgingsplanAktiv,
  finnNyesteTidligereOppfolgingsplanMedVirksomhet,
  finnTidligereOppfolgingsplaner,
} from "../../../utils/oppfolgingplanUtils";
import { useDineSykmeldte } from "./dinesykmeldteQueriesAG";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";
import { useRouter } from "next/router";

export const useOppfolgingsplanerAG = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldt = useDineSykmeldte();
  const narmesteLederId = useNarmesteLederId();

  const sykmeldtFnr = sykmeldt.data?.fnr;

  const fetchOppfolgingsplanerAG = () =>
    get<Oppfolgingsplan[]>(
      `${apiBasePath}/${narmesteLederId}/oppfolgingsplaner`,
      "fetchOppfolgingsplanerAG",
    );

  return useQuery({
    queryKey: [queryKeys.OPPFOLGINGSPLANER],
    queryFn: fetchOppfolgingsplanerAG,
    enabled: !!sykmeldtFnr,
    throwOnError: true,
  });
};

export const useAktiveOppfolgingsplanerAG = () => {
  const allePlaner = useOppfolgingsplanerAG();

  if (allePlaner.isSuccess) {
    const planer = allePlaner.data.filter((oppfolgingsplan) =>
      erOppfolgingsplanAktiv(oppfolgingsplan),
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
  const landingPage = useLandingUrl();
  const router = useRouter();

  const opprettOppfolgingsplanAG = async (kopierTidligerePlan: boolean) => {
    if (!oppfolgingsplaner.isSuccess || !sykmeldt.isSuccess) {
      return;
    }

    let oppfolgingsplanId;

    const opprettOppfoelgingsplan: OpprettOppfoelgingsdialog = {
      sykmeldtFnr: sykmeldt.data.fnr,
      virksomhetsnummer: sykmeldt.data.orgnummer,
    };
    if (kopierTidligerePlan) {
      const oppfolgingsplan = finnNyesteTidligereOppfolgingsplanMedVirksomhet(
        oppfolgingsplaner.data,
        sykmeldt.data.orgnummer,
      );
      if (oppfolgingsplan) {
        oppfolgingsplanId = await post(
          `${apiOppfolgingsplanPath}/${oppfolgingsplan.id}/kopier`,
          "kopierOppfolgingsplanAG",
        );
      } else {
        //Om det skjedde noe rart og man ikke fikk opp den tidligere planen, så bare lag en ny.
        oppfolgingsplanId = await post(
          `${apiBasePath}/oppfolgingsplaner/opprett`,
          "opprettOppfolgingsplanAG",
          opprettOppfoelgingsplan,
        );
      }
    } else {
      oppfolgingsplanId = await post(
        `${apiBasePath}/oppfolgingsplaner/opprett`,
        "opprettOppfolgingsplanAG",
        opprettOppfoelgingsplan,
      );
    }
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    const arbeidsOppgaverPage = `${landingPage}/${oppfolgingsplanId}/arbeidsoppgaver`;
    await router.push(arbeidsOppgaverPage);
  };

  return useMutation({ mutationFn: opprettOppfolgingsplanAG });
};
