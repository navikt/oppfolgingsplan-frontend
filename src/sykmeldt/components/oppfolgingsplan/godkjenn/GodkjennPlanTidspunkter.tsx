import { BubbleImage, CalendarImage } from "@/common/images/imageComponents";
import { toDateMedMaanedNavn } from "@/common/utils/dateUtils";
import { Gyldighetstidspunkt } from "../../../../schema/oppfolgingsplanSchema";
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
        imgUrl={BubbleImage}
        tekst={`Planen evalueres: ${toDateMedMaanedNavn(
          gyldighetstidspunkt.evalueres
        )}`}
      />
    </>
  );
};
