import { toDateMedMaanedNavn } from "../../utils/dateUtils";
import CalendarImage from "../blocks/images/calendar.svg";
import StjerneImage from "../blocks/images/stjerne.svg";
import { BildeTekstLinje } from "./BildeTekstLinje";
import { Gyldighetstidspunkt } from "../../types/oppfolgingsplan";

interface Props {
  gyldighetstidspunkt?: Gyldighetstidspunkt | null;
}

export const GodkjennPlanTidspunkter = ({ gyldighetstidspunkt }: Props) => {
  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <>
      <BildeTekstLinje
        imgUrl={CalendarImage}
        tekst={`Planens varighet: ${toDateMedMaanedNavn(
          gyldighetstidspunkt?.fom
        )} - ${toDateMedMaanedNavn(gyldighetstidspunkt.tom)}`}
      />
      <BildeTekstLinje
        imgUrl={StjerneImage}
        tekst={`Planen evalueres: ${toDateMedMaanedNavn(
          gyldighetstidspunkt.evalueres
        )}`}
      />
    </>
  );
};
