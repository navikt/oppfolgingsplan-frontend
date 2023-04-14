import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { Gyldighetstidspunkt } from "../../../types/oppfolgingsplan";

export const useFerdigstillVarsel = (
  ferdigstillVarsel: UseMutationResult<void, unknown, number, unknown>,
  oppfolgingsplanId: number,
  gyldighetstidspunkt: Gyldighetstidspunkt | undefined
) => {
  useEffect(() => {
    if (oppfolgingsplanId && gyldighetstidspunkt) {
      const varselKey = `ferdigstilt-varsel-${oppfolgingsplanId}`;
      const alleredeFerdigstilt = sessionStorage.getItem(varselKey);
      if (alleredeFerdigstilt) {
        return;
      }
      ferdigstillVarsel.mutate(oppfolgingsplanId);
      sessionStorage.setItem(varselKey, "true");
    }
  }, [ferdigstillVarsel, oppfolgingsplanId, gyldighetstidspunkt]);
};
