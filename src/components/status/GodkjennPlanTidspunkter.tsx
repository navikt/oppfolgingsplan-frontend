import { Gyldighetstidspunkt } from "../../schema/oppfolgingsplanSchema";
import { toDateMedMaanedNavn } from "../../utils/dateUtils";
import { CalendarImage, StjerneImage } from "../blocks/images/imageComponents";
import { BildeTekstLinje } from "./BildeTekstLinje";

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
