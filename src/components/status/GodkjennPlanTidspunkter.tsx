import { Gyldighetstidspunkt } from "../../schema/oppfolgingsplanSchema";
import { toDateMedMaanedNavn } from "../../utils/dateUtils";
import { CalendarImage, StjerneImage } from "../blocks/images/imageComponents";
import { BildeTekstLinje } from "./BildeTekstLinje";

interface Props {
  gyldighetstidspunkt: Gyldighetstidspunkt;
}

export const GodkjennPlanTidspunkter = ({ gyldighetstidspunkt }: Props) => {
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
