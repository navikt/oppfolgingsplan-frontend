import { toDateMedMaanedNavn } from "../../../utils/dateUtils";
import CalendarImage from "../../blocks/images/calendar.svg";
import { BildeTekstLinje } from "../BildeTekstLinje";
import { GodkjentPlan } from "../../../types/oppfolgingsplan";

interface Props {
  godkjentPlan: GodkjentPlan;
}

export const GodkjentPlanAvbruttTidspunkt = ({ godkjentPlan }: Props) => {
  if (!godkjentPlan.gyldighetstidspunkt.fom || !godkjentPlan.avbruttPlan)
    return null;

  return (
    <BildeTekstLinje
      imgUrl={CalendarImage}
      tekst={`Planens varighet: ${toDateMedMaanedNavn(
        godkjentPlan.gyldighetstidspunkt.fom
      )} - ${toDateMedMaanedNavn(godkjentPlan.avbruttPlan.tidspunkt)}`}
    />
  );
};
