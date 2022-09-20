import {useApiBasePath} from "@/common/hooks/routeHooks";
import {get} from "@/common/api/axios/axios";
import {useQuery} from "react-query";
import {ApiErrorException} from "@/common/api/axios/errors";
import {Tilgang} from "@/types/oppfolgingsplanservice/tilgangType";

export const TILGANG_SM = "tilgang-sykmeldt";

export const useTilgangSM = () => {
    const apiBasePath = useApiBasePath();

    const fetchTilgang = () => get<Tilgang>(`${apiBasePath}/tilgang`);

    return useQuery<Tilgang, ApiErrorException>(
        TILGANG_SM,
        fetchTilgang
    );
};