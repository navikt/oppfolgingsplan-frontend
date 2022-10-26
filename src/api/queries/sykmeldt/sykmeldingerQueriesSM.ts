import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import useSWRImmutable from "swr/immutable";

export const SYKMELDINGER_SM = "sykmeldinger-sykmeldt";

export const useSykmeldingerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchSykmeldinger = () =>
    get<Sykmelding[]>(`${apiBasePath}/sykmeldinger`);

  const { data, error } = useSWRImmutable(SYKMELDINGER_SM, fetchSykmeldinger);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSykmeldtFnr = (): string | null => {
  const sykmeldinger = useSykmeldingerSM();

  if (sykmeldinger.data) {
    const sykmelding = sykmeldinger.data.find((sykmelding) => sykmelding.fnr);
    return sykmelding?.fnr || null;
  }

  return null;
};
