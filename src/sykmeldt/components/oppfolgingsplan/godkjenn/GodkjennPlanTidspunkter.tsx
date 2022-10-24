import { BubbleImage, CalendarImage } from "@/common/images/imageComponents";
import { toDateMedMaanedNavn } from "@/common/utils/dateUtils";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { BildeTekstLinje } from "./BildeTekstLinje";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjennPlanTidspunkter = ({ oppfolgingsplan }: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <>
      <BildeTekstLinje
        imgUrl={CalendarImage}
        tekst={`Planens varighet: ${toDateMedMaanedNavn(
          gyldighetstidspunkt?.fom
        )} - ${toDateMedMaanedNavn(gyldighetstidspunkt?.tom)}`}
      />
      <BildeTekstLinje
        imgUrl={BubbleImage}
        tekst={`Planen evalueres: ${toDateMedMaanedNavn(
          gyldighetstidspunkt?.evalueres
        )}`}
      />
    </>
  );
};
