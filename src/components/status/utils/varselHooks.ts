import { useEffect } from "react";

import { useFerdigstillVarselForPlanMutation } from "../../../api/queries/varsel/ferdigstillingQueries";
import { useOppfolgingsplanRouteId } from "../../../hooks/routeHooks";

export const useFerdigstillVarselForPlan = () => {
  const oppfolgingsplanId = useOppfolgingsplanRouteId();

  const { mutate: mutateFerdigstillVarsel } =
    useFerdigstillVarselForPlanMutation(oppfolgingsplanId);

  useEffect(() => {
    mutateFerdigstillVarsel();
  }, [mutateFerdigstillVarsel]);
};
