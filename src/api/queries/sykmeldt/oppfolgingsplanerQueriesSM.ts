import { get, post } from "../../axios/axios";
import {
  useApiBasePath,
  useLandingUrl,
  useOppfolgingsplanRouteId,
} from "../../../hooks/routeHooks";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from "../../../utils/oppfolgingplanUtils";
import { ApiErrorException } from "../../axios/errors";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";
import { useRouter } from "next/router";
import { logger } from "@navikt/next-logger";

export const useOppfolgingsplanerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [queryKeys.OPPFOLGINGSPLANER],
    fetchOppfolgingsplaner,
    {
      useErrorBoundary: true,
      onError: (err) => {
        logger.error(`useOppfolgingsplanerSM feiler ${err}`);
      },
    }
  );
};

export const useAktivPlanSM = (): Oppfolgingsplan | undefined => {
  const id = useOppfolgingsplanRouteId();
  const allePlaner = useOppfolgingsplanerSM();

  if (allePlaner.isSuccess) {
    return allePlaner.data.find((plan) => plan.id === id);
  }

  return undefined;
};

export const useGjeldendePlanSM = (
  virksomhetsnummer?: string | null
): Oppfolgingsplan | null => {
  const allePlaner = useOppfolgingsplanerSM();

  if (!virksomhetsnummer) {
    return null;
  }

  if (allePlaner.isSuccess) {
    return (
      finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
        allePlaner.data,
        virksomhetsnummer
      ) || null
    );
  }

  return null;
};

export const useOpprettOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();
  const sykmeldtFnr = useSykmeldtFnr();
  const landingPage = useLandingUrl();
  const router = useRouter();

  const opprettOppfolgingsplan = async (virksomhetsnummer: string) => {
    if (!sykmeldtFnr) return;

    const data: OpprettOppfoelgingsdialog = {
      sykmeldtFnr: sykmeldtFnr,
      virksomhetsnummer: virksomhetsnummer,
    };

    const oppfolgingsplanId = await post<number>(
      `${apiBasePath}/oppfolgingsplaner/opprett`,
      data
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
    const arbeidsOppgaverPage = `${landingPage}/${oppfolgingsplanId}/arbeidsoppgaver`;
    await router.push(arbeidsOppgaverPage);
  };

  return useMutation(opprettOppfolgingsplan);
};
