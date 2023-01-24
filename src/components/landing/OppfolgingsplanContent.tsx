import React from "react";
import {
  erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import { Sykmelding } from "../../schema/sykmeldingSchema";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "utils/sykmeldingUtils";
import OppfolgingsdialogerVisning from "./teaser/OppfolgingsdialogerVisning";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsplanUtenGyldigSykmelding from "./OppfolgingsplanUtenGyldigSykmelding";
import { IngenLedereInfoBoks } from "components/blocks/infoboks/IngenLedereInfoBoks";
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
  if (!sykmeldtHarGyldigSykmelding(sykmeldinger)) {
    return (
      <div>
        <OppfolgingsplanUtenGyldigSykmelding
          sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(
            sykmeldinger
          )}
        />

        {oppfolgingsplaner &&
          harTidligereOppfolgingsplaner(oppfolgingsplaner) && (
            <OppfolgingsdialogerUtenAktivSykmelding
              oppfolgingsplanerUtenAktivSykmelding={finnTidligereOppfolgingsplaner(
                oppfolgingsplaner
              )}
            />
          )}
      </div>
    );
  } else if (
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
