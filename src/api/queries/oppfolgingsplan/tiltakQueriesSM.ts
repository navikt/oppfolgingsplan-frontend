import {
  useOppfolgingsplanApiPath,
  useOppfolgingsplanRouteId,
} from "hooks/routeHooks";
import { post } from "api/axios/axios";
import { OPPFOLGINGSPLANER_SM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Kommentar, Tiltak } from "schema/oppfolgingsplanSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OPPFOLGINGSPLANER_AG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

export const useLagreTiltak = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const lagreTiltak = async (tiltak: Partial<Tiltak>) => {
    await post(`${apiPath}/${oppfolgingsplanId}/tiltak/lagre`, tiltak);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(lagreTiltak);
};

export const useSlettTiltak = () => {
  const apiPath = useOppfolgingsplanApiPath();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();
  const queryClient = useQueryClient();

  const slettTiltak = async (tiltakId: number) => {
    await post(`${apiPath}/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`);
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(slettTiltak);
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
      kommentar
    );
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(lagreKommentar);
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
      `${apiPath}/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`
    );
    await queryClient.invalidateQueries([
      OPPFOLGINGSPLANER_SM,
      OPPFOLGINGSPLANER_AG,
    ]);
  };

  return useMutation(slettKommentar);
};
