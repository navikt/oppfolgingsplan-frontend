import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import {Arbeidsoppgave} from "../../../types/oppfolgingsplan";
import {
  useApiBasePath,
  useOppfolgingsplanApiPath,
  useOppfolgingsplanUrl,
  useOppfolgingsplanRouteId
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

export const useLagreArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = async (oppgave: Partial<Arbeidsoppgave>) => {
    await post(
        `${apiPath}/${oppfolgingsplanId}/arbeisoppgave/lagre`,
        oppgave
    );
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(lagreOppgave, {
    onError: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
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
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_AG]);
  };

  return useMutation(slettOppgave);
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
