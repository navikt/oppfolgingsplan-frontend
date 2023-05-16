import { InfoBoksWithImage } from "./InfoBoksWithImage";
import OppfolgingsdialogIkkeTilgangImage from "../../blocks/images/oppfolgingsdialog-infoboks-ikkeTilgang.svg";
import React from "react";

export const IkkeTilgangTilAnsattInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Du har ikke tilgang til denne personen"}
      imageSrc={OppfolgingsdialogIkkeTilgangImage}
    />
  );
};
