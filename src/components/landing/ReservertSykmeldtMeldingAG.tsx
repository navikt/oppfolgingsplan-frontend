import React from "react";
import Information from "../blocks/images/information.svg";
import { InfoBoksWithImageAndButton } from "../blocks/infoboks/InfoBoksWithImageAndButton";

interface Props {
  onClose(): void;
}
const ReservertSykmeldtMelding = ({ onClose }: Props) => {
  return (
    <InfoBoksWithImageAndButton
      heading={"Din sykmeldte arbeidstaker ønsker ikke digitale varsler"}
      description={
        "Det betyr at de ikke vil motta varsler som tjenesten sender ut og derfor må kontaktes direkte av deg. Dere kan fortsatt bruke tjenesten."
      }
      imageSrc={Information}
      buttonText={"Jeg forstår"}
      onClose={onClose}
    />
  );
};

export default ReservertSykmeldtMelding;
