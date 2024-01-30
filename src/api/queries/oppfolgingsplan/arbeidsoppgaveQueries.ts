import { post } from "../../axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
} from "../../../hooks/routeHooks";
import { queryKeys } from "../queryKeys";
import { ArbeidsOppgaveDTO } from "../../../schema/oppfolgingsplanSchema";

export const useLagreArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = async (oppgave: Partial<ArbeidsOppgaveDTO>) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/arbeidsoppgave/lagre`,
      "lagreOppgave",
      oppgave,
    );
  };

  return useMutation({
    mutationFn: lagreOppgave,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
    onError: () => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
  });
};

export const useSlettArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettOppgave = async (arbeidsoppgaveId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/arbeidsoppgave/${arbeidsoppgaveId}/slett`,
      "slettOppgave",
    );
  };

  return useMutation({
    mutationFn: slettOppgave,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
    onError: () => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.OPPFOLGINGSPLANER],
      });
    },
  });
};
