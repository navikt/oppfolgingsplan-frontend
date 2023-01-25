import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Arbeidsoppgave } from "../../../types/oppfolgingsplan";
import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
} from "hooks/routeHooks";
import { queryKeys } from "../queryKeys";

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
