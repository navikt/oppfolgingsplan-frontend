import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export const useArbeidsforhold = (fnr: string) => {
  const apiBasePath = useApiBasePath();

  const getArbeidsforhold = () =>
    get<string[]>(`${apiBasePath}/arbeidsforhold`, "useArbeidsforhold", {
      personIdent: fnr,
    });

  return useQuery({
    queryKey: [queryKeys.ARBEIDSFORHOLD],
    queryFn: getArbeidsforhold,
    throwOnError: true,
  });
};
