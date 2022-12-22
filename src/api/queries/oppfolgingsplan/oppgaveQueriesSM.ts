import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
} from "hooks/routeHooks";
import { Arbeidsoppgave } from "schema/oppfolgingsplanSchema";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

export const useLagreArbeidsoppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreOppgave = async (oppgave: Partial<Arbeidsoppgave>) => {
    await post(`${apiPath}/${oppfolgingsplanId}/oppgave/lagre`, oppgave);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(lagreOppgave, {
    onError: () => {
      queryClient.invalidateQueries([
        OPPFOLGINGSPLANER_SM,
        OPPFOLGINGSPLANER_AG,
      ]);
    },
  });
};

export const useSlettOppgave = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettOppgave = async (arbeidsoppgaveId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(slettOppgave);
};
