import {useApiBasePath} from "@/common/hooks/routeHooks";
import {get} from "@/common/api/axios/axios";
import {useQuery} from "react-query";
import {ApiErrorException} from "@/common/api/axios/errors";
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";

export const SYKMELDINGER_SM = "sykmeldinger-sykmeldt";

export const useSykmeldingerSM = () => {
    const apiBasePath = useApiBasePath();

    const fetchSykmeldinger = () => get<Sykmelding[]>(`${apiBasePath}/sykmeldinger`);

    return useQuery<Sykmelding[], ApiErrorException>(
        SYKMELDINGER_SM,
        fetchSykmeldinger
    );
};