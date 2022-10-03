import {useApiBasePath} from "@/common/hooks/routeHooks";
import {post} from "@/common/api/axios/axios";
import {useMutation, useQueryClient} from "react-query";
import {OPPFOLGINGSPLANER_SM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

interface LagreTiltakProps {
    oppfolgingsplanId: number;
    tiltak: Tiltak;
}

export const useLagreTiltakSM = () => {
    const apiBasePath = useApiBasePath();

    const request = ({oppfolgingsplanId, tiltak}: LagreTiltakProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`, tiltak);

    return useMutation(request)
}

interface SlettTiltakProps {
    oppfolgingsplanId: number;
    tiltakId: number;
}

export const useSlettTiltakSM = () => {
    const apiBasePath = useApiBasePath();
    const queryClient = useQueryClient();

    const request = ({
                         oppfolgingsplanId,
                         tiltakId
                     }: SlettTiltakProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`);

    return useMutation(request, {
        onSuccess: () => {
            queryClient.invalidateQueries(OPPFOLGINGSPLANER_SM);
        }
    })
}

interface LagreKommentarProps {
    oppfolgingsplanId: number;
    tiltakId: number;
    fnr: string;
    kommentar: string
}

export const useLagreKommentarSM = () => {
    const apiBasePath = useApiBasePath();
    const queryClient = useQueryClient();

    const request = ({
                         oppfolgingsplanId,
                         tiltakId,
                         fnr,
                         kommentar
                     }: LagreKommentarProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/lagre`, {
        fnr: fnr,
        kommentar: kommentar
    });

    return useMutation(request, {
        onSuccess: () => {
            queryClient.invalidateQueries(OPPFOLGINGSPLANER_SM);
        }
    })
}

interface SlettKommentarProps {
    oppfolgingsplanId: number;
    tiltakId: number;
    kommentarId: number;
}

export const useSlettKommentarSM = () => {
    const apiBasePath = useApiBasePath();
    const queryClient = useQueryClient();

    const request = ({
                         oppfolgingsplanId,
                         tiltakId,
                         kommentarId
                     }: SlettKommentarProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`);

    return useMutation(request, {
        onSuccess: () => {
            queryClient.invalidateQueries(OPPFOLGINGSPLANER_SM);
        }
    })
}