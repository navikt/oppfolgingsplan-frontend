import React from "react";
import {
  erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "@/common/utils/oppfolgingplanUtils";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import {
  sykmeldtHarGyldigSykmelding,
  sykmeldtHarIngenSendteSykmeldinger,
} from "@/common/utils/sykmeldingUtils";
import { IngenLedereInfoBoks } from "@/common/components/infoboks/IngenLedereInfoBoks";
import OppfolgingsdialogerVisning from "./OppfolgingsdialogerVisning";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsplanUtenGyldigSykmelding from "./OppfolgingsplanUtenGyldigSykmelding";

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
}

const OppfolgingsplanContent = ({ oppfolgingsplaner, sykmeldinger }: Props) => {
  //todo improve
  const narmesteledere: NarmesteLeder[] | null = oppfolgingsplaner
    .filter((plan) => plan.arbeidsgiver && plan.arbeidsgiver.naermesteLeder)
    .map((plan) => plan.arbeidsgiver!!.naermesteLeder!!);

  if (
    erSykmeldtUtenOppfolgingsplanerOgNaermesteLedere(
      oppfolgingsplaner,
      sykmeldinger,
      narmesteledere
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
        narmesteLedere={narmesteledere}
      />
    );
  }
};

export default OppfolgingsplanContent;
