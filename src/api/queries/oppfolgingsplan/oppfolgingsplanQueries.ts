import { post } from "../../axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useApiBasePath,
  useAudience,
  useLandingUrl,
  useOppfolgingsplanApiPath,
  useOppfolgingsplanUrl,
} from "../../../hooks/routeHooks";
import { useRouter } from "next/router";
import { GodkjennsistPlanData } from "../../../schema/godkjennsistPlanSchema";
import { queryKeys } from "../queryKeys";
import { GodkjennPlanData } from "../../../schema/godkjennPlanSchema";
import {
  GodkjennEgenPlan,
  Oppfolgingsplan,
} from "../../../types/oppfolgingsplan";

export const useKopierOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();
  const landingPage = useLandingUrl();
  const router = useRouter();

  const postKopierOppfolgingsplan = async (oppfolgingsplanIdToCopy: number) => {
    const oppfolgingsplanId = await post<number>(
      `${apiPath}/${oppfolgingsplanIdToCopy}/kopier`,
      "postKopierOppfolgingsplan",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    const arbeidsOppgaverPage = `${landingPage}/${oppfolgingsplanId}/arbeidsoppgaver`;
    await router.push(arbeidsOppgaverPage);
  };

  return useMutation({ mutationFn: postKopierOppfolgingsplan });
};

export const useNullstillGodkjenning = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const nullstillGodkjenning = async (oppfolgingsplanId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/nullstillgodkjenning`,
      "useNullstillGodkjenning",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
  };

  return useMutation({ mutationFn: nullstillGodkjenning });
};

export const useGodkjennsistOppfolgingsplan = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennsistPlan = async (data: GodkjennsistPlanData) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjennsist`,
      "useGodkjennsistOppfolgingsplan",
      data,
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    await router.push(statusUrl);
  };

  return useMutation({ mutationFn: godkjennsistPlan });
};

export const useGodkjennOppfolgingsplan = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennPlan = async (data: GodkjennPlanData) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjenn`,
      "useGodkjennOppfolgingsplan",
      data,
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    await router.push(statusUrl);
  };

  return useMutation({
    mutationFn: godkjennPlan,
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
  });
};

export const useGodkjennEgenOppfolgingsplanAG = (oppfolgingsplanId: number) => {
  const apiBasePath = useApiBasePath();
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "status");
  const queryClient = useQueryClient();
  const router = useRouter();

  const godkjennEgenPlan = async (data: GodkjennEgenPlan) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/godkjennegenplan`,
      "useGodkjennEgenOppfolgingsplanAG",
      data,
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    await router.push(statusUrl);
  };

  return useMutation({
    mutationFn: godkjennEgenPlan,
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
  });
};

export const useAvvisOppfolgingsplan = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const postAvvisOppfolgingsplan = async (oppfolgingsplanId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/avvis`,
      "useAvvisOppfolgingsplan",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
  };

  return useMutation({ mutationFn: postAvvisOppfolgingsplan });
};

export const useDelOppfolgingsplanMedNav = () => {
  const apiBasePath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedNAV = async (oppfolgingsplanId: number) => {
    await post(
      `${apiBasePath}/${oppfolgingsplanId}/delmednav`,
      "useDelOppfolgingsplanMedNav",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
  };

  return useMutation({ mutationFn: delPlanMedNAV });
};

export const useDelOppfolgingsplanMedFastlege = () => {
  const apiBasePath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();

  const delPlanMedFastlege = async (oppfolgingsplanId: number) => {
    await post(
      `${apiBasePath}/${oppfolgingsplanId}/delmedfastlege`,
      "useDelOppfolgingsplanMedFastlege",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
  };

  return useMutation({ mutationFn: delPlanMedFastlege });
};

export const useAvbrytOppfolgingsplan = () => {
  const apiBasePath = useOppfolgingsplanApiPath();
  const queryClient = useQueryClient();
  const landingPage = useLandingUrl();
  const router = useRouter();

  const postAvbrytOppfolgingsplan = async (oppfolgingsplanId: number) => {
    const newOppfolgingsplanId = await post<number>(
      `${apiBasePath}/${oppfolgingsplanId}/avbryt`,
      "useAvbrytOppfolgingsplan",
    );
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.OPPFOLGINGSPLANER],
    });
    const arbeidsOppgaverPage = `${landingPage}/${newOppfolgingsplanId}/arbeidsoppgaver`;
    await router.push(arbeidsOppgaverPage);
  };

  return useMutation({ mutationFn: postAvbrytOppfolgingsplan });
};

export const useInnloggetFnr = (
  oppfolgingsplan: Oppfolgingsplan | undefined,
): string | null | undefined => {
  const { isAudienceSykmeldt } = useAudience();

  if (isAudienceSykmeldt) {
    return oppfolgingsplan?.arbeidstaker.fnr;
  }
  return oppfolgingsplan?.arbeidsgiver.naermesteLeder?.fnr;
};
