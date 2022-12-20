import { GodkjentPlan } from "../../../schema/oppfolgingsplanSchema";
import { toDateMedMaanedNavn } from "../../../utils/dateUtils";
import CalendarImage from "../../blocks/images/calendar.svg";
import { BildeTekstLinje } from "../BildeTekstLinje";

interface Props {
  godkjentPlan: GodkjentPlan;
}

export const GodkjentPlanAvbruttTidspunkt = ({ godkjentPlan }: Props) => {
  return (
    <BildeTekstLinje
      imgUrl={CalendarImage}
      tekst={`Planens varighet: ${toDateMedMaanedNavn(
        godkjentPlan.gyldighetstidspunkt?.fom
      )} - ${toDateMedMaanedNavn(godkjentPlan.avbruttPlan?.tidspunkt)}`}
    />
  );
};
