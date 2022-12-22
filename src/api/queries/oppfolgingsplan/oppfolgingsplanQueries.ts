import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "api/axios/axios";
import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanUrl,
} from "hooks/routeHooks";
import { useRouter } from "next/router";
import { GodkjennPlanData } from "schema/godkjennPlanSchema";
import { GodkjennsistPlanData } from "schema/godkjennsistPlanSchema";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

export const useKopierOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postKopierOppfolgingsplanSM = async (
    oppfolgingsplanIdToCopy: number
  ) => {
    await post(`${apiPath}/${oppfolgingsplanIdToCopy}/kopier`);

    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(postKopierOppfolgingsplanSM);
};

export const useAvbrytOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postAvbrytOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/avbryt`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(postAvbrytOppfolgingsplan);
};

export const useAvvisOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postAvvisOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/avvis`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(postAvvisOppfolgingsplan);
};

export const useNullstillGodkjenning = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const nullstillGodkjenning = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/nullstillgodkjenning`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(nullstillGodkjenning);
};

export const useDelOppfolgingsplanMedNav = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedNAV = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/delmednav`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(delPlanMedNAV);
};

export const useDelOppfolgingsplanMedFastlege = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedFastlege = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/delmedfastlege`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(delPlanMedFastlege);
};

export const useGodkjennOppfolgingsplan = (oppfolgingsplanId: number) => {
  const apiPath = useOppfolgingsplanApiPath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennPlan = async (data: GodkjennPlanData) => {
    await post(`${apiPath}/${oppfolgingsplanId}/godkjenn`, data);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
    await router.push(statusUrl);
  };

  return useMutation(godkjennPlan, {
    onError: () => {
      queryClient.invalidateQueries([
        OPPFOLGINGSPLANER_SM,
        OPPFOLGINGSPLANER_AG,
      ]);
    },
  });
};

export const useGodkjennsistOppfolgingsplan = (oppfolgingsplanId: number) => {
  const apiPath = useOppfolgingsplanApiPath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennsistPlan = async (data: GodkjennsistPlanData) => {
    await post(`${apiPath}/${oppfolgingsplanId}/godkjennsist`, data);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
    await router.push(statusUrl);
  };

  return useMutation(godkjennsistPlan);
};
