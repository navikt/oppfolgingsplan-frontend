import React from "react";
import {
  erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "@/common/utils/oppfolgingplanUtils";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "@/common/utils/sykmeldingUtils";
import { IngenLedereInfoBoks } from "@/common/components/infoboks/IngenLedereInfoBoks";
import OppfolgingsdialogerVisning from "./OppfolgingsdialogerVisning";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsplanUtenGyldigSykmelding from "./OppfolgingsplanUtenGyldigSykmelding";
import { useNarmesteLedereSM } from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";

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
