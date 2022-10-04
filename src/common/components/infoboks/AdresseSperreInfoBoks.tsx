import React from "react";
import { OppfolgingsdialogIkkeTilgangImage } from "@/common/images/imageComponents";
import { InfoBoksWithImage } from "@/common/components/infoboks/InfoBoksWithImage";

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
