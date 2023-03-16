import { useApiBasePath } from "../../../hooks/routeHooks";
import { get } from "../../axios/axios";
import { SykmeldingDTO } from "../../../schema/sykmeldingSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";

export const useSykmeldingerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchSykmeldinger = () =>
    get<SykmeldingDTO[]>(`${apiBasePath}/sykmeldinger`);

  return useQuery<SykmeldingDTO[], ApiErrorException>(
    [queryKeys.SYKMELDINGER],
    fetchSykmeldinger,
    {
      useErrorBoundary: true,
    }
  );
};

export const useSykmeldtFnr = (): string | null => {
  const sykmeldinger = useSykmeldingerSM();

  if (sykmeldinger.isSuccess) {
    const sykmelding = sykmeldinger.data.find((sykmelding) => sykmelding.fnr);
    return sykmelding?.fnr || null;
  }

  return null;
};
