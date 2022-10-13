import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
} from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Tiltak } from "../../../../schema/oppfolgingsplanSchema";
import { useSWRConfig } from "swr";

export const useLagreTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async (tiltak: Partial<Tiltak>) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`,
      tiltak
    ).then(await mutate(OPPFOLGINGSPLANER_SM));
};

export const useSlettTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async (tiltakId: number) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`
    ).then(await mutate(OPPFOLGINGSPLANER_SM));
};

interface LagreKommentarProps {
  tiltakId: number;
  fnr: string;
  kommentar: string;
}

export const useLagreKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async ({ tiltakId, fnr, kommentar }: LagreKommentarProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
      {
        fnr: fnr,
        kommentar: kommentar,
      }
    ).then(await mutate(OPPFOLGINGSPLANER_SM));
};

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async ({ tiltakId, kommentarId }: SlettKommentarProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
    ).then(await mutate(OPPFOLGINGSPLANER_SM));
};
