import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFerdigstillVarsel = (
  ferdigstillVarsel: UseMutationResult<void, unknown, number, unknown>,
  oppfolgingsplanId: number,
) => {
  useEffect(() => {
    if (oppfolgingsplanId) {
      const varselKey = `ferdigstilt-varsel-${oppfolgingsplanId}`;
      const alleredeFerdigstilt = sessionStorage.getItem(varselKey);
      if (alleredeFerdigstilt) {
        return;
      }
      ferdigstillVarsel.mutate(oppfolgingsplanId);
      sessionStorage.setItem(varselKey, "true");
    }
  }, [ferdigstillVarsel, oppfolgingsplanId]);
};
