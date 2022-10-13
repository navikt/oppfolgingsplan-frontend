import { get, post } from "@/common/api/axios/axios";
import {
  useApiBasePath,
  useOppfolgingsplanRouteId,
} from "@/common/hooks/routeHooks";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../../../schema/opprettOppfoelgingsdialogSchema";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

export const OPPFOLGINGSPLANER_SM = "oppfolgingsplaner-sykmeldt";

export const useOppfolgingsplanerSM = () => {
  const apiBasePath = useApiBasePath();

  const fetchOppfolgingsplaner = () =>
    get<Oppfolgingsplan[]>(`${apiBasePath}/oppfolgingsplaner`);

  const { data, error, mutate } = useSWRImmutable(
    OPPFOLGINGSPLANER_SM,
    fetchOppfolgingsplaner
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useAktivPlanSM = (): Oppfolgingsplan | undefined => {
  const id = useOppfolgingsplanRouteId();
  const allePlaner = useOppfolgingsplanerSM();

  if (!allePlaner.isLoading && !allePlaner.isError) {
    return allePlaner.data!!.find((plan) => plan.id == id);
  }

  return undefined;
};

// export const useKopierOppfolgingsplanSM = () => {
//   const apiBasePath = useApiBasePath();
//
//   const postKopierOppfolgingsplanSM = (id: number) =>
//     post(`${apiBasePath}/oppfolgingsplaner/kopier/${id}`);
//
//   return useMutation(postKopierOppfolgingsplanSM);
// };

export const useOpprettOppfolgingsplanSM = () => {
  const apiBasePath = useApiBasePath();
  const { mutate } = useSWRConfig();

  return async (data: OpprettOppfoelgingsdialog) =>
    await post(`${apiBasePath}/oppfolgingsplaner/opprett`, data).then(
      await mutate(OPPFOLGINGSPLANER_SM)
    );
};
