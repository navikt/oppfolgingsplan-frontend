import { useApiBasePath } from "@/common/hooks/routeHooks";
import { get } from "@/common/api/axios/axios";
import { useQueries } from "react-query";
import { Virksomhet } from "../../../../schema/oppfolgingsplanSchema";
import { useOppfolgingsplanerSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

export const VIRKSOMHET_SM = "virksomhet-sykmeldt";

export const useVirksomheterSM = () => {
  const apiBasePath = useApiBasePath();
  const alleVirksomhetsnummer = useAlleVirksomhetsnummer();

  const queries = alleVirksomhetsnummer.map((virksomhetsnummer) => {
    return {
      queryKey: [VIRKSOMHET_SM, virksomhetsnummer],
      queryFn: () =>
        get<Virksomhet>(`${apiBasePath}/virksomhet/${virksomhetsnummer}`),
    };
  });

  return useQueries<Virksomhet[]>(queries);
};

const useAlleVirksomhetsnummer = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();

  const virksomhetsNummer = oppfolgingsplaner.data
    ?.filter((plan) => plan.virksomhet)
    ?.filter((plan) => plan.virksomhet!!.virksomhetsnummer)
    .map((plan) => plan.virksomhet!!.virksomhetsnummer);

  return [...new Set(virksomhetsNummer)];
};
