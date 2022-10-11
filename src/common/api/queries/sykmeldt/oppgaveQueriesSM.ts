import { useApiBasePath } from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { useMutation, useQueryClient } from "react-query";
import { OPPFOLGINGSPLANER_SM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Arbeidsoppgave } from "../../../../schema/oppfolgingsplanSchema";

interface LagreOppgaveProps {
  oppfolgingsplanId: number;
  oppgave: Partial<Arbeidsoppgave>;
}

export const useLagreArbeidsoppgaveSM = () => {
  const apiBasePath = useApiBasePath();

  const request = ({ oppfolgingsplanId, oppgave }: LagreOppgaveProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/lagre`,
      oppgave
    );

  return useMutation(request);
};

interface SlettOppgaveProps {
  oppfolgingsplanId: number;
  arbeidsoppgaveId: number;
}

export const useSlettOppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const queryClient = useQueryClient();

  const request = ({
    oppfolgingsplanId,
    arbeidsoppgaveId,
  }: SlettOppgaveProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );

  return useMutation(request, {
    onSuccess: () => {
      queryClient.invalidateQueries(OPPFOLGINGSPLANER_SM);
    },
  });
};
