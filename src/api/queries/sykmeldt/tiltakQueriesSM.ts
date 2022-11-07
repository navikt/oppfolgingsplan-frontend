import { useApiBasePath, useOppfolgingsplanRouteId } from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Kommentar, Tiltak } from "../../../schema/oppfolgingsplanSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLagreTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreTiltak = (tiltak: Partial<Tiltak>) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`,
      tiltak
    );

  return useMutation(lagreTiltak, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

export const useSlettTiltakSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettTiltak = (tiltakId: number) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`
    );

  return useMutation(slettTiltak, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

interface LagreKommentarProps {
  tiltakId: number;
  kommentar: Partial<Kommentar>;
}

export const useLagreKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreKommentar = ({ tiltakId, kommentar }: LagreKommentarProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
      kommentar
    );

  return useMutation(lagreKommentar, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentarSM = () => {
  const apiBasePath = useApiBasePath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettKommentar = ({ tiltakId, kommentarId }: SlettKommentarProps) =>
    post(
      `${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
    );

  return useMutation(slettKommentar, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPPFOLGINGSPLANER_SM]);
    },
  });
};
