import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { useOppfolgingsplanApiPath, useOppfolgingsplanRouteId} from "hooks/routeHooks";
import {Arbeidsoppgave} from "../../../types/oppfolgingsplan";

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
