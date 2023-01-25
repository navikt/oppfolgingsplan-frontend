import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Arbeidsoppgave } from "../../../types/oppfolgingsplan";
import {
  useApiBasePath,
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
  useOppfolgingsplanUrl,
} from "hooks/routeHooks";
import { useRouter } from "next/router";
import { GodkjennsistPlanData } from "../../../schema/godkjennsistPlanSchema";
import { GodkjennPlanData } from "../../../schema/godkjennPlanSchema";
import { queryKeys } from "../queryKeys";

export const useKopierOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postKopierOppfolgingsplan = async (oppfolgingsplanIdToCopy: number) => {
    await post(`${apiPath}/${oppfolgingsplanIdToCopy}/kopier`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(postKopierOppfolgingsplan);
};

export const useNullstillGodkjenning = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const nullstillGodkjenning = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/nullstillgodkjenning`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(nullstillGodkjenning);
};

export const useLagreArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = async (oppgave: Partial<Arbeidsoppgave>) => {
    await post(`${apiPath}/${oppfolgingsplanId}/arbeisoppgave/lagre`, oppgave);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(lagreOppgave, {
    onError: () => {
      queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
    },
  });
};

export const useSlettArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettOppgave = async (arbeidsoppgaveId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/arbeisoppgave/${arbeidsoppgaveId}/slett`
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(slettOppgave);
};

export const useGodkjennOppfolgingsplan = (oppfolgingsplanId: number) => {
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

export const useGodkjennsistOppfolgingsplan = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennsistPlan = async (data: GodkjennsistPlanData) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjennsist`,
      data
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
    await router.push(statusUrl);
  };

  return useMutation(godkjennsistPlan);
};

export const useAvvisOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postAvvisOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/avvis`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(postAvvisOppfolgingsplan);
};

export const useDelOppfolgingsplanMedNav = () => {
  const apiBasePath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedNAV = async (oppfolgingsplanId: number) => {
    await post(`${apiBasePath}/${oppfolgingsplanId}/delmednav`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(delPlanMedNAV);
};

export const useDelOppfolgingsplanMedFastlege = () => {
  const apiBasePath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedFastlege = async (oppfolgingsplanId: number) => {
    await post(`${apiBasePath}/${oppfolgingsplanId}/delmedfastlege`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(delPlanMedFastlege);
};

export const useAvbrytOppfolgingsplan = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const postAvbrytOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/avbryt`);
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(postAvbrytOppfolgingsplan);
};
