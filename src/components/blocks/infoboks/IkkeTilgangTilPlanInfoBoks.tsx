import { InfoBoksWithImage } from "./InfoBoksWithImage";
import OppfolgingsdialogIkkeTilgangImage from "../../blocks/images/oppfolgingsdialog-infoboks-ikkeTilgang.svg";
import React from "react";

export const IkkeTilgangTilPlanInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Du har ikke tilgang til oppfølgingsplanen"}
      imageSrc={OppfolgingsdialogIkkeTilgangImage}
    />
  );
};
