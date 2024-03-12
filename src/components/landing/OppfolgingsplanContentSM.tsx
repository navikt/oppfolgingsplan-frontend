import React from "react";
import { erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere } from "../../utils/oppfolgingplanUtils";
import { SykmeldingDTO } from "../../schema/sykmeldingSchema";
import { IngenLedereInfoBoks } from "../blocks/infoboks/IngenLedereInfoBoks";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";
import { NarmesteLederDTO } from "../../schema/narmestelederSchema";
import OppfolgingsdialogerVisningSM from "./teaser/sykmeldt/OppfolgingsdialogerVisningSM";

interface Props {
  oppfolgingsplaner: OppfolgingsplanDTO[];
  sykmeldinger: SykmeldingDTO[];
  narmesteLedere: NarmesteLederDTO[];
}

const OppfolgingsplanContentSM = ({
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
      <OppfolgingsdialogerVisningSM
        oppfolgingsplaner={oppfolgingsplaner}
        sykmeldinger={sykmeldinger}
        narmesteLedere={narmesteLedere}
      />
    );
  }
};

export default OppfolgingsplanContentSM;
