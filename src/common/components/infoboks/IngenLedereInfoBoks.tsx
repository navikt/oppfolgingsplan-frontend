import { OppfolgingsdialogIngenlederImage } from "@/common/images/imageComponents";
import { InfoBoksWithImage } from "@/common/components/infoboks/InfoBoksWithImage";
import React from "react";

export const IngenLedereInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Du kan ikke lage en oppfølgingsplan akkurat nå"}
      description={
        "For å bruke denne tjenesten må vi vite hvem lederen din er slik at informasjonen kommer til rett person. Ta kontakt med lederen din og be om at riktig leder blir registrert i Altinn."
      }
      imageSrc={OppfolgingsdialogIngenlederImage}
    />
  );
};
