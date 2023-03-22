import { post } from "../../axios/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FerdigstillGodkjennVarsel } from "../../../types/varsel";

export const useFerdigstillGodkjennPlanVarsel = () => {
  const router = useRouter();
  const basePath = router.basePath;

  const ferdigstillVarsel = async (
    ferdigstilling: FerdigstillGodkjennVarsel
  ) => {
    await post(`${basePath}/api/varsel/ferdigstill`, {
      erSykmeldt: ferdigstilling.erSykmeldt,
      oppfolgingsplanId: ferdigstilling.oppfolgingsplanId,
    });
  };

  return useMutation(ferdigstillVarsel);
};
