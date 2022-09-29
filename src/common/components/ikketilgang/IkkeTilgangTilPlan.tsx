import {InfoBoksWithImage} from "@/common/components/infoboks/InfoBoksWithImage";
import {OppfolgingsdialogIkkeTilgangImage} from "@/common/images/imageComponents";
import React from "react";

export const IkkeTilgangTilPlan = () => {
    return (
        <InfoBoksWithImage heading={"Du har ikke tilgang til oppfølgingsplanen"}
                           imageSrc={OppfolgingsdialogIkkeTilgangImage}/>

    )
}