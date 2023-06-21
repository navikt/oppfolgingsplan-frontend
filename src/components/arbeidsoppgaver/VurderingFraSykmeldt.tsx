import { CustomAlertWithoutIcon } from "./CustomAlertWithoutIcon";
import { useAudience } from "../../hooks/routeHooks";
import { texts } from "../seplanen/texts";

export const VurderingFraSykmeldt = () => {
  const { isAudienceSykmeldt } = useAudience();

  return (
    <div className="mb-4">
      <CustomAlertWithoutIcon>
        {isAudienceSykmeldt &&
          texts.arbeidsoppgaveList.vurdering.giArbeidsgiverVurdering}
        {!isAudienceSykmeldt &&
          texts.arbeidsoppgaveList.vurdering.narSykmeldtHarVurdert}
      </CustomAlertWithoutIcon>
    </div>
  );
};
