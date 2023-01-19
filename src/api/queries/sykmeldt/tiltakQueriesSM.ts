import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Kommentar, Tiltak } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";

export const useLagreTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreTiltak = async (tiltak: Partial<Tiltak>) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`,
      tiltak
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(lagreTiltak);
};

export const useSlettTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettTiltak = async (tiltakId: number) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(slettTiltak);
};

interface LagreKommentarProps {
  tiltakId: number;
  kommentar: Partial<Kommentar>;
}

export const useLagreKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreKommentar = async ({
    tiltakId,
    kommentar,
  }: LagreKommentarProps) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
      kommentar
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(lagreKommentar);
};

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettKommentar = async ({
    tiltakId,
    kommentarId,
  }: SlettKommentarProps) => {
    await post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
    );
    await queryClient.invalidateQueries([queryKeys.OPPFOLGINGSPLANER]);
  };

  return useMutation(slettKommentar);
};
