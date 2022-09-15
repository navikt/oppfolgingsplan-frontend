import {useApiBasePath} from "@/common/hooks/routeHooks";
import {get} from "@/common/api/axios/axios";
import {useQuery} from "react-query";
import {ApiErrorException} from "@/common/api/axios/errors";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";

export const NARMESTELEDERE_SM = "narmesteledere-sykmeldt";

export const useNarmesteLedereSM = () => {
    const apiBasePath = useApiBasePath();

    const fetchNarmesteLedere = () => get<NarmesteLeder[]>(`${apiBasePath}/narmesteledere`);

    return useQuery<NarmesteLeder[], ApiErrorException>(
        NARMESTELEDERE_SM,
        fetchNarmesteLedere
    );
};