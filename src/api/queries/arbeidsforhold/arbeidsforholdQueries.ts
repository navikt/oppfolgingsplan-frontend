import { useDineSykmeldte } from "../arbeidsgiver/dinesykmeldteQueriesAG";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { useRouter } from "next/router";
import { StillingDTO } from "../../../schema/oppfolgingsplanSchema";

export const useArbeidsforhold = () => {
  const router = useRouter();
  const sykmeldtData = useDineSykmeldte();

  const fetchArbeidsforhold = () =>
    get<StillingDTO[]>(
      `${router.basePath}/api/v1/arbeidsforhold`,
      "fetchArbeidsforhold",
      {
        personIdent: sykmeldtData.data?.fnr,
      },
    );

  return useQuery({
    queryKey: [queryKeys.KONTAKTINFO],
    queryFn: fetchArbeidsforhold,
    enabled: !!sykmeldtData.data?.fnr,
  });
};
