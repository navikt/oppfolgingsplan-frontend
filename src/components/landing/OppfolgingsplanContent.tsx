import React from "react";
import { erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere } from "../../utils/oppfolgingplanUtils";
import { SykmeldingDTO } from "../../schema/sykmeldingSchema";
import OppfolgingsdialogerVisning from "./teaser/OppfolgingsdialogerVisning";
import { IngenLedereInfoBoks } from "../blocks/infoboks/IngenLedereInfoBoks";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";

interface Props {
  oppfolgingsplaner: OppfolgingsplanDTO[];
  sykmeldinger: SykmeldingDTO[];
  narmesteLedere: NarmesteLederDTO[];
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
      narmesteLedere,
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
