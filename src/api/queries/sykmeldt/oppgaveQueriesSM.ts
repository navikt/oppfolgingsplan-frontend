import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Arbeidsoppgave } from "../../../schema/oppfolgingsplanSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLagreArbeidsoppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = (oppgave: Partial<Arbeidsoppgave>) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/lagre`,
      oppgave
    );

  return useMutation(lagreOppgave, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useSlettOppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettOppgave = (arbeidsoppgaveId: number) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );

  return useMutation(slettOppgave, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};
