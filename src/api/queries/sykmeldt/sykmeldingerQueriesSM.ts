import { useApiBasePath } from "hooks/routeHooks";
import { get } from "api/axios/axios";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";

export const useSykmeldingerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchSykmeldinger = () =>
    get<Sykmelding[]>(`${apiBasePath}/sykmeldinger`);

  return useQuery<Sykmelding[], ApiErrorException>(
    [queryKeys.SYKMELDINGER],
    fetchSykmeldinger
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
