import OppfolgingsdialogIngenlederImage from "../../blocks/images/oppfolgingsdialog-ingenleder.svg";
import { InfoBoksWithImage } from "./InfoBoksWithImage";
import React from "react";

export const ManglerLederForVirksomhetInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Vi finner ikke din nærmeste leder i Altinn"}
      description={
        "Ta kontakt med lederen din og be om at riktig leder blir registrert i Altinn."
      }
      imageSrc={OppfolgingsdialogIngenlederImage}
    />
  );
};
