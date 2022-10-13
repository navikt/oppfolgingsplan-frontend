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

  return async (tiltak: Partial<Tiltak>) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`,
      tiltak
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
};

export const useSlettTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async (tiltakId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
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

  return async ({ tiltakId, fnr, kommentar }: LagreKommentarProps) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
      {
        fnr: fnr,
        kommentar: kommentar,
      }
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
};

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const { mutate } = useSWRConfig();

  return async ({ tiltakId, kommentarId }: SlettKommentarProps) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
    );
    await mutate(OPPFOLGINGSPLANER_SM);
  };
};
