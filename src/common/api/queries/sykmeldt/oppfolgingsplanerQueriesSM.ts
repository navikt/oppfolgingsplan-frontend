import {useMutation, useQuery} from "react-query";
import {get, post} from "@/common/api/axios/axios";
import {ApiErrorException} from "@/common/api/axios/errors";
import {useApiBasePath} from "@/common/hooks/routeHooks";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

export const OPPFOLGINGSPLANER_SM = "oppfolgingsplaner-sykmeldt";

export const useOppfolgingsplanerSM = () => {
    const apiBasePath = useApiBasePath();

    const fetchOppfolgingsplaner = () => get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

    return useQuery<Oppfolgingsplan[], ApiErrorException>(
        OPPFOLGINGSPLANER_SM,
        fetchOppfolgingsplaner
    );
};

export const useOppfolgingsplanSM = (id: number): Oppfolgingsplan | undefined => {
    const allePlaner = useOppfolgingsplanerSM()
    return allePlaner.data && allePlaner.data.find(plan => plan.id == id)
};

export const useKopierOppfolgingsplanSM = () => {
    const apiBasePath = useApiBasePath();

    const postKopierOppfolgingsplanSM = (id: number) => post(`${apiBasePath}/oppfolgingsplaner/kopier/${id}`);

    return useMutation(postKopierOppfolgingsplanSM)
}

//todo fiks
export const useOpprettOppfolgingsplanSM = () => {
    const apiBasePath = useApiBasePath();

    const postOpprettOppfolgingsplanSM = (virksomhetsnummer?: string) => post(`${apiBasePath}/oppfolgingsplaner/opprett/${virksomhetsnummer}`);

    return useMutation(postOpprettOppfolgingsplanSM)
}