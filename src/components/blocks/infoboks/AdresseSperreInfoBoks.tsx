import React from "react";
import OppfolgingsdialogIkkeTilgangImage from "../../blocks/images/oppfolgingsdialog-infoboks-ikkeTilgang.svg";
import { InfoBoksWithImage } from "./InfoBoksWithImage";

export const AdresseSperreInfoBoks = () => {
  return (
    <InfoBoksWithImage
      heading={"Du har ikke tilgang til oppfølgingsplanen"}
      description={
        "Du er registrert med en adressesperre og har av sikkerhetsgrunner derfor ikke tilgang til oppfølgingsplanen digitalt."
      }
      imageSrc={OppfolgingsdialogIkkeTilgangImage}
    />
  );
};
