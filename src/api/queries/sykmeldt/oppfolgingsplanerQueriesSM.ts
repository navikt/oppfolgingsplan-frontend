import { get, post } from "api/axios/axios";
import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
  useOppfolgingsplanUrl,
} from "hooks/routeHooks";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";
import { GodkjennPlanData } from "../../../schema/godkjennPlanSchema";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from "../../../utils/oppfolgingplanUtils";
import { ApiErrorException } from "../../axios/errors";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";

export const useOppfolgingsplanerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [queryKeys.OPPFOLGINGSPLANER],
    fetchOppfolgingsplaner
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

export const useAvbrytOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const postAvbrytOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/avbryt`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(postAvbrytOppfolgingsplan);
};

export const useDelOppfolgingsplanMedNavSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const delPlanMedNAV = async (oppfolgingsplanId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/delmednav`
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(delPlanMedNAV);
};

export const useDelOppfolgingsplanMedFastlegeSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const delPlanMedFastlege = async (oppfolgingsplanId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/delmedfastlege`
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(delPlanMedFastlege);
};

export const useGodkjennOppfolgingsplanSM = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennPlan = async (data: GodkjennPlanData) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjenn`,
      data
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
    await router.push(statusUrl);
  };

  return useMutation(godkjennPlan, {
    onError: () => {
      queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
    },
  });
};

export const useOpprettOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const opprettOppfolgingsplan = async (data: OpprettOppfoelgingsdialog) => {
    await post(`${apiBasePath}/oppfolgingsplaner/opprett`, data);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(opprettOppfolgingsplan);
};
