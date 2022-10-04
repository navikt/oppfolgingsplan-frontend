import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useQuery } from "react-query";
import { ApiErrorException } from "@/common/api/axios/errors";
import { Sykmelding } from "../../../../schema/sykmeldingSchema";

export const SYKMELDINGER_SM = "sykmeldinger-sykmeldt";

export const useSykmeldingerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchSykmeldinger = () =>
    get<Sykmelding[]>(`${apiBasePath}/sykmeldinger`);

  return useQuery<Sykmelding[], ApiErrorException>(
    SYKMELDINGER_SM,
    fetchSykmeldinger
  );
};

export const useSykmeldtFnr = (): string | null => {
  const sykmeldinger = useSykmeldingerSM();

  if (sykmeldinger.data) {
    const sykmelding = sykmeldinger.data.find((sykmelding) => sykmelding.fnr);
    return sykmelding?.fnr || null;
  }

  return null;
};
