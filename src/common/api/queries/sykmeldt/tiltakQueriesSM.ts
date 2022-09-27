import {useApiBasePath} from "@/common/hooks/routeHooks";
import {post} from "@/common/api/axios/axios";
import {useMutation, useQueryClient} from "react-query";
import {OPPFOLGINGSPLANER_SM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

export const useLagreTiltakSM = () => {
    const apiBasePath = useApiBasePath();

    const lagreTiltakSM = (oppfolgingsplanId: number) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/lagre`);

    return useMutation(lagreTiltakSM)
}

interface SlettTiltakProps {
    oppfolgingsplanId: number;
    tiltakId: number;
}

export const useSlettTiltakSM = () => {
    const apiBasePath = useApiBasePath();

    const slettTiltakSM = ({
                               oppfolgingsplanId,
                               tiltakId
                           }: SlettTiltakProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/slett`);

    return useMutation(slettTiltakSM)
}

interface SlettKommentarProps {
    oppfolgingsplanId: number;
    tiltakId: number;
    kommentarId: number;
}

export const useSlettKommentarSM = () => {
    const apiBasePath = useApiBasePath();
    const queryClient = useQueryClient();

    const slettTiltakSM = ({
                               oppfolgingsplanId,
                               tiltakId,
                               kommentarId
                           }: SlettKommentarProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/${tiltakId}/kommentar/${kommentarId}/slett`);

    return useMutation(slettTiltakSM, {
        onSuccess: () => {
            queryClient.invalidateQueries(OPPFOLGINGSPLANER_SM);
        }
    })
}