import React from "react";
import {
  erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import { Sykmelding } from "../../schema/sykmeldingSchema";
import { Oppfolgingsplan } from "../../schema/oppfolgingsplanSchema";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "utils/sykmeldingUtils";
import OppfolgingsdialogerVisning from "./teaser/OppfolgingsdialogerVisning";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsplanUtenGyldigSykmelding from "./OppfolgingsplanUtenGyldigSykmelding";
import { useNarmesteLedereSM } from "api/queries/sykmeldt/narmesteLedereQueriesSM";
import { IngenLedereInfoBoks } from "components/blocks/infoboks/IngenLedereInfoBoks";

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
}

const OppfolgingsplanContent = ({ oppfolgingsplaner, sykmeldinger }: Props) => {
  const narmesteledere = useNarmesteLedereSM();

  if (
    erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere(
      oppfolgingsplaner,
      sykmeldinger,
      narmesteledere.data!!
    )
  ) {
    return <IngenLedereInfoBoks />;
  } else if (!sykmeldtHarGyldigSykmelding(sykmeldinger)) {
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
  } else {
    return (
      <OppfolgingsdialogerVisning
        oppfolgingsplaner={oppfolgingsplaner}
        sykmeldinger={sykmeldinger}
        narmesteLedere={narmesteledere.data!!}
      />
    );
  }
};

export default OppfolgingsplanContent;
