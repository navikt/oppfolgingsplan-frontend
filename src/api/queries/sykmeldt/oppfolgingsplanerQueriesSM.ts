import { get, post } from "api/axios/axios";
import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from "../../../utils/oppfolgingplanUtils";
import { ApiErrorException } from "../../axios/errors";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";
import { useSykmeldtFnr } from "./sykmeldingerQueriesSM";

export const useOppfolgingsplanerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [queryKeys.OPPFOLGINGSPLANER],
    fetchOppfolgingsplaner,
      {
        useErrorBoundary: true,
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

  const opprettOppfolgingsplan = async (virksomhetsnummer: string) => {
    if (!sykmeldtFnr) return;

    const data: OpprettOppfoelgingsdialog = {
      sykmeldtFnr: sykmeldtFnr,
      virksomhetsnummer: virksomhetsnummer,
    };

    await post(`${apiBasePath}/oppfolgingsplaner/opprett`, data);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(opprettOppfolgingsplan);
};
