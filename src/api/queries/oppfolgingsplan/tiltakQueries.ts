import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
} from "../../../hooks/routeHooks";
import { post } from "../../axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Kommentar, Tiltak } from "../../../types/oppfolgingsplan";
import { queryKeys } from "../queryKeys";

export const useLagreTiltak = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreTiltak = async (tiltak: Partial<Tiltak>) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/tiltak/lagre`,
      "useLagreTiltak",
      tiltak,
    );
  };

  return useMutation({
    mutationFn: lagreTiltak,
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

export const useSlettTiltakSM = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettTiltak = async (tiltakId: number) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`,
      "useSlettTiltakSM",
    );
  };

  return useMutation({
    mutationFn: slettTiltak,
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

interface LagreKommentarProps {
  tiltakId: number;
  kommentar: Partial<Kommentar>;
}

export const useLagreKommentar = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreKommentar = async ({
    tiltakId,
    kommentar,
  }: LagreKommentarProps) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`,
      "useLagreKommentar",
      kommentar,
    );
  };

  return useMutation({
    mutationFn: lagreKommentar,
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

interface SlettKommentarProps {
  tiltakId: number;
  kommentarId: number;
}

export const useSlettKommentar = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettKommentar = async ({
    tiltakId,
    kommentarId,
  }: SlettKommentarProps) => {
    await post(
      `${apiPath}/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`,
      "useSlettKommentar",
    );
  };

  return useMutation({
    mutationFn: slettKommentar,
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
