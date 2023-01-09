import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Arbeidsoppgave } from "../../../types/oppfolgingsplan";

export const useLagreArbeidsoppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = async (oppgave: Partial<Arbeidsoppgave>) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/lagre`,
      oppgave
    );
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
  };

  return useMutation(lagreOppgave, {
    onError: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useSlettOppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettOppgave = async (arbeidsoppgaveId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );
    await queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
  };

  return useMutation(slettOppgave);
};
