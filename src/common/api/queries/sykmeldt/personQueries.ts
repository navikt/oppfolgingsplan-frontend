import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useQuery } from "react-query";
import { Person } from "../../../../schema/oppfolgingsplanSchema";
import { useSykmeldtFnr } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { ApiErrorException } from "@/common/api/axios/errors";

export const PERSON_SM = "person-sykmeldt";

export const usePersoninfoSM = () => {
  const apiBasePath = useApiBasePath();
  const sykmeldtFnr = useSykmeldtFnr();

  const fetchPerson = () => get<Person>(`${apiBasePath}/person/${sykmeldtFnr}`);

  return useQuery<Person, ApiErrorException>(PERSON_SM, fetchPerson, {
    enabled: !!sykmeldtFnr,
  });
};
