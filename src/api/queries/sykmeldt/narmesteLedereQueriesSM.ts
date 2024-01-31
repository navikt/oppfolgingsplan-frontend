import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";

export const useNarmesteLedereSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchNarmesteLedere = () =>
    get<NarmesteLederDTO[]>(
      `${apiBasePath}/narmesteledere`,
      "fetchNarmesteLedereSM",
    );

  return useQuery({
    queryKey: [queryKeys.NARMESTELEDERE],
    queryFn: fetchNarmesteLedere,
    throwOnError: true,
  });
};
