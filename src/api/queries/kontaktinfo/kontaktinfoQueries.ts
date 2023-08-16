import { useDineSykmeldte } from "../arbeidsgiver/dinesykmeldteQueriesAG";
import { get } from "../../axios/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiErrorException } from "../../axios/errors";
import { queryKeys } from "../queryKeys";
import { useRouter } from "next/router";
import { KontaktinfoDTO } from "../../../schema/kontaktinfoSchema";

export const useKontaktinfo = () => {
  const router = useRouter();
  const sykmeldtData = useDineSykmeldte();

  const fetchKontaktinfo = () =>
    get<KontaktinfoDTO>(
      `${router.basePath}/api/kontaktinfo`,
      "fetchKontaktinfo",
      {
        personIdent: sykmeldtData.data?.fnr,
      }
    );

  return useQuery<KontaktinfoDTO, ApiErrorException>(
    [queryKeys.KONTAKTINFO],
    fetchKontaktinfo,
    {
      enabled: !!sykmeldtData.data?.fnr,
    }
  );
};
