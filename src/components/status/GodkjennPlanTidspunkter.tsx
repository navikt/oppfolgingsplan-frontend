import { BildeTekstLinje } from "./BildeTekstLinje";
import {Gyldighetstidspunkt} from "../../schema/oppfolgingsplanSchema";
import {BubbleImage, CalendarImage} from "../blocks/images/imageComponents";
import {toDateMedMaanedNavn} from "../../utils/dateUtils";

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
        imgUrl={BubbleImage}
        tekst={`Planen evalueres: ${toDateMedMaanedNavn(
          gyldighetstidspunkt.evalueres
        )}`}
      />
    </>
  );
};
