import React from "react";
import { erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere } from "../../utils/oppfolgingplanUtils";
import { Sykmelding } from "../../schema/sykmeldingSchema";
import OppfolgingsdialogerVisning from "./teaser/OppfolgingsdialogerVisning";
import { IngenLedereInfoBoks } from "../blocks/infoboks/IngenLedereInfoBoks";
import { NarmesteLeder, Oppfolgingsplan } from "../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
  narmesteLedere: NarmesteLeder[];
}

const OppfolgingsplanContent = ({
  oppfolgingsplaner,
  sykmeldinger,
  narmesteLedere,
}: Props) => {
  if (
    erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere(
      oppfolgingsplaner,
      sykmeldinger,
      narmesteLedere
    )
  ) {
    return <IngenLedereInfoBoks />;
  } else {
    return (
      <OppfolgingsdialogerVisning
        oppfolgingsplaner={oppfolgingsplaner}
        sykmeldinger={sykmeldinger}
        narmesteLedere={narmesteLedere}
      />
    );
  }
};

export default OppfolgingsplanContent;
