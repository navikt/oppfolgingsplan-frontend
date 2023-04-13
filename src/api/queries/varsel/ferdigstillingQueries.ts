import { post } from "../../axios/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useFerdigstillGodkjennPlanVarsel = () => {
  const router = useRouter();
  const basePath = router.basePath;

  const ferdigstillVarsel = async (oppfolgingsplanId: number) => {
    await post(`${basePath}/api/varsel/${oppfolgingsplanId}/ferdigstill`);
  };

  return useMutation(ferdigstillVarsel);
};
