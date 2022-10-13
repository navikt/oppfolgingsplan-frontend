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

  return (tiltak: Partial<Tiltak>) =>
    mutate(
      OPPFOLGINGSPLANER_SM,
      post(
        `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`,
        tiltak
      )
    );
};

export const useSlettTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return (tiltakId: number) =>
    mutate(
      OPPFOLGINGSPLANER_SM,
      post(
        `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`
      )
    );
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

  return ({ tiltakId, fnr, kommentar }: LagreKommentarProps) =>
    mutate(
      OPPFOLGINGSPLANER_SM,
      post(
        `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
        {
          fnr: fnr,
          kommentar: kommentar,
        }
      )
    );
};

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return ({ tiltakId, kommentarId }: SlettKommentarProps) =>
    mutate(
      OPPFOLGINGSPLANER_SM,
      post(
        `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
      )
    );
};
