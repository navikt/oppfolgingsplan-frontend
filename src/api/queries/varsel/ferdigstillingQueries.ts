import { post } from "../../axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const queryKeyHasFerdigStiltVarselForPlanId = (oppfolgingsplanId: number) => [
  "hasFerdigstiltVarselForPlanId",
  oppfolgingsplanId,
];

export const useFerdigstillVarselForPlanMutation = (
  oppfolgingsplanId: number,
) => {
  const router = useRouter();
  const basePath = router.basePath;

  const queryClient = useQueryClient();

  const { data: hasFerdigstiltVarselForPlan } = useQuery({
    queryKey: queryKeyHasFerdigStiltVarselForPlanId(oppfolgingsplanId),
    initialData: false,
  });

  const ferdigstillVarsel = async () => {
    if (!hasFerdigstiltVarselForPlan) {
      await post(
        `${basePath}/api/varsel/${oppfolgingsplanId}/ferdigstill`,
        "useFerdigstillGodkjennPlanVarsel",
      );
      queryClient.setQueryData(
        queryKeyHasFerdigStiltVarselForPlanId(oppfolgingsplanId),
        true,
      );
    }
  };

  return useMutation({ mutationFn: ferdigstillVarsel });
};
