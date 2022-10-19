import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { BildeTekstLinje } from "./BildeTekstLinje";
import { CalendarImage, StjerneImage } from "@/common/images/imageComponents";
import { toDateMedMaanedNavn } from "@/common/utils/dateUtils";
import styled from "styled-components";

interface Props {
  avvisDialog: () => void;
  oppfolgingsdialog: Oppfolgingsplan;
}

const Container = styled.div`
  margin: 2rem 0;
`;

export const GodkjennPlanTidspunkt = ({
  avvisDialog,
  oppfolgingsdialog,
}: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsdialog?.godkjenninger?.[0]?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <Container>
      <BildeTekstLinje
        imgUrl={CalendarImage}
        tekst={`Planens varighet: ${toDateMedMaanedNavn(
          gyldighetstidspunkt?.fom
        )} - ${toDateMedMaanedNavn(gyldighetstidspunkt?.tom)}`}
      />
      <BildeTekstLinje
        imgUrl={StjerneImage}
        tekst={`Planen evalueres: ${toDateMedMaanedNavn(
          gyldighetstidspunkt?.evalueres
        )}`}
      />
    </Container>
  );
};
