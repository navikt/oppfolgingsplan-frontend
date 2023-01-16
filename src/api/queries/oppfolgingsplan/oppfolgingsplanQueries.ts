import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import {
  useApiBasePath,
  useOppfolgingsplanApiPath,
  useOppfolgingsplanUrl,
} from "hooks/routeHooks";
import { useRouter } from "next/router";
import { GodkjennsistPlanData } from "../../../schema/godkjennsistPlanSchema";

export const useKopierOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postKopierOppfolgingsplan = async (oppfolgingsplanIdToCopy: number) => {
    await post(`${apiPath}/${oppfolgingsplanIdToCopy}/kopier`);

    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(postKopierOppfolgingsplan);
};

export const useNullstillGodkjenning = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const nullstillGodkjenning = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/nullstillgodkjenning`);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(nullstillGodkjenning);
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
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
    await router.push(statusUrl);
  };

  return useMutation(godkjennsistPlan);
};

export const useAvvisOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postAvvisOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/avvis`);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(postAvvisOppfolgingsplan);
};
