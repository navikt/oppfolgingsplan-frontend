import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
} from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Arbeidsoppgave } from "../../../../schema/oppfolgingsplanSchema";
import { useSWRConfig } from "swr";

export const useLagreArbeidsoppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return (oppgave: Partial<Arbeidsoppgave>) =>
    mutate(
      OPPFOLGINGSPLANER_SM,
      post(
        `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/lagre`,
        oppgave
      )
    );
};

interface SlettOppgaveProps {
  oppfolgingsplanId: number;
  arbeidsoppgaveId: number;
}

export const useSlettOppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const { mutate } = useSWRConfig();

  const request = ({
    oppfolgingsplanId,
    arbeidsoppgaveId,
  }: SlettOppgaveProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );

  return mutate(OPPFOLGINGSPLANER_SM, request);
};
