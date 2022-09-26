import {useApiBasePath} from "@/common/hooks/routeHooks";
import {post} from "@/common/api/axios/axios";
import {useMutation} from "react-query";

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
                           }: SlettTiltakProps) => post(`${apiBasePath}/oppfolgingsplaner/${oppfolgingsplanId}/tiltak/slett/${tiltakId}`);

    return useMutation(slettTiltakSM)
}