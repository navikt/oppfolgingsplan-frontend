import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { SykmeldingDTO } from "../../../schema/sykmeldingSchema";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

export const useSykmeldingerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchSykmeldinger = () =>
    get<SykmeldingDTO[]>(`${apiBasePath}/sykmeldinger`, "fetchSykmeldingerSM");

  return useQuery({
    queryKey: [queryKeys.SYKMELDINGER],
    queryFn: fetchSykmeldinger,
    throwOnError: true,
  });
};

export const useSykmeldtFnr = (): string | null => {
  const sykmeldinger = useSykmeldingerSM();

  if (sykmeldinger.isSuccess) {
    const sykmelding = sykmeldinger.data.find((sykmelding) => sykmelding.fnr);
    return sykmelding?.fnr || null;
  }

  return null;
};
