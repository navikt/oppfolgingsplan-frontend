import React from "react";
import { OppfolgingsdialogIkkeAktivSykmeldingImage } from "components/blocks/images/imageComponents";
import { InfoBoksWithImage } from "../blocks/infoboks/InfoBoksWithImage";

interface Props {
  sykmeldtHarIngenSendteSykmeldinger: boolean;
}

const OppfolgingsplanUtenGyldigSykmelding = ({
  sykmeldtHarIngenSendteSykmeldinger,
}: Props) => {
  return (
    <InfoBoksWithImage
      heading={"Du kan ikke lage en oppfølgingsplan akkurat nå"}
      description={
        sykmeldtHarIngenSendteSykmeldinger
          ? "Du kan ikke lage en ny oppfølgingsplan fordi du ikke har sendt inn sykmeldingen din."
          : "Du kan ikke lage en ny oppfølgingsplan fordi du ikke er sykmeldt nå."
      }
      imageSrc={OppfolgingsdialogIkkeAktivSykmeldingImage}
    />
  );
};

export default OppfolgingsplanUtenGyldigSykmelding;
