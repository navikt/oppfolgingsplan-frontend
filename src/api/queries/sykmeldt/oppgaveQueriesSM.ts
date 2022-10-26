import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
} from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Arbeidsoppgave } from "../../../schema/oppfolgingsplanSchema";
import { useSWRConfig } from "swr";

export const useLagreArbeidsoppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async (oppgave: Partial<Arbeidsoppgave>) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/lagre`,
      oppgave
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
};

export const useSlettOppgaveSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async (arbeidsoppgaveId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/oppgave/${arbeidsoppgaveId}/slett`
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
};
