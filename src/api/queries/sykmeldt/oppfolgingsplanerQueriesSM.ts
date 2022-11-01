import { get, post } from "api/axios/axios";
import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
  useOppfolgingsplanUrl,
} from "hooks/routeHooks";
import { GodkjennsistPlanData } from "../../../schema/godkjennsistPlanSchema";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../../schema/opprettOppfoelgingsdialogSchema";
import { GodkjennPlanData } from "../../../schema/godkjennPlanSchema";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from "../../../utils/oppfolgingplanUtils";
import { ApiErrorException } from "../../axios/errors";

export const OPPFOLGINGSPLANER_SM = "oppfolgingsplaner-sykmeldt";

export const useOppfolgingsplanerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  return useQuery<Oppfolgingsplan[], ApiErrorException>(
    [OPPFOLGINGSPLANER_SM],
    fetchOppfolgingsplaner
  );
};

export const useAktivPlanSM = (): Oppfolgingsplan | undefined => {
  const id = useOppfolgingsplanRouteId();
  const allePlaner = useOppfolgingsplanerSM();

  if (allePlaner.isSuccess) {
    return allePlaner.data!!.find((plan) => plan.id == id);
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

export const useKopierOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const postKopierOppfolgingsplanSM = (oppfolgingsplanIdToCopy: number) =>
    post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanIdToCopy}/kopier`);

  return useMutation(postKopierOppfolgingsplanSM, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useAvbrytOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const postAvbrytOppfolgingsplan = (oppfolgingsplanId: number) =>
    post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/avbryt`);

  return useMutation(postAvbrytOppfolgingsplan, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useAvvisOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const postAvvisOppfolgingsplan = (oppfolgingsplanId: number) =>
    post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/avvis`);

  return useMutation(postAvvisOppfolgingsplan, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useNullstillGodkjenningSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const nullstillGodkjenning = (oppfolgingsplanId: number) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/nullstillgodkjenning`
    );

  return useMutation(nullstillGodkjenning, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useDelOppfolgingsplanMedNavSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const delPlanMedNAV = (oppfolgingsplanId: number) =>
    post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/delmednav`);

  return useMutation(delPlanMedNAV, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useDelOppfolgingsplanMedFastlegeSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const delPlanMedFastlege = (oppfolgingsplanId: number) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/delmedfastlege`
    );

  return useMutation(delPlanMedFastlege, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useGodkjennOppfolgingsplanSM = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennPlan = (data: GodkjennPlanData) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjenn`,
      data
    );

  return useMutation(godkjennPlan, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
      await router.push(statusUrl);
    },
  });
};

export const useGodkjennsistOppfolgingsplanSM = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennsistPlan = (data: GodkjennsistPlanData) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjennsist`,
      data
    );

  return useMutation(godkjennsistPlan, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
      await router.push(statusUrl);
    },
  });
};

export const useOpprettOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const opprettOppfolgingsplan = (data: OpprettOppfoelgingsdialog) =>
    post(`${apiBasePath}/oppfolgingsplaner/opprett`, data);

  return useMutation(opprettOppfolgingsplan, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};
