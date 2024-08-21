import { useDineSykmeldte } from "../arbeidsgiver/dinesykmeldteQueriesAG";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { StillingDTO } from "../../../schema/oppfolgingsplanSchema";

export const useArbeidsforhold = () => {
  //const router = useRouter();
  const sykmeldtData = useDineSykmeldte();
  console.log("sykmeldtData", sykmeldtData.data);
  console.log("enabled", !!sykmeldtData.data?.fnr);
  // ${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}

  const fetchArbeidsforhold = () =>
    get<StillingDTO[]>(
      // `${router.basePath}/api/v1/arbeidsforhold`,
      `http://oppfolgingsplan-backend/api/v1/arbeidsforhold`,
      "fetchArbeidsforhold",
      {
        personIdent: sykmeldtData.data?.fnr,
      },
    );

  return useQuery({
    queryKey: [queryKeys.ARBEIDSFORHOLD],
    queryFn: fetchArbeidsforhold,
    enabled: !!sykmeldtData.data?.fnr,
  });
};
