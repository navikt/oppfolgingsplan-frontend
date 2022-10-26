import { InfoBoksWithImage } from "./InfoBoksWithImage";
import { OppfolgingsdialogIkkeTilgangImage } from "components/blocks/images/imageComponents";
import React from "react";

export const IkkeTilgangTilPlanInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Du har ikke tilgang til oppfølgingsplanen"}
      imageSrc={OppfolgingsdialogIkkeTilgangImage}
    />
  );
};
