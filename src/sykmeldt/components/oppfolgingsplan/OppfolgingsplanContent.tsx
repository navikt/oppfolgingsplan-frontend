import React from "react";
import {
  erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
  finnTidligereOppfolgingsdialoger,
  harTidligereOppfolgingsdialoger,
} from "@/common/utils/oppfolgingsdialogUtils";
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
import OppfolgingsdialogUtenGyldigSykmelding from "./OppfolgingsdialogUtenGyldigSykmelding";

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
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(
      oppfolgingsplaner,
      sykmeldinger,
      narmesteledere
    )
  ) {
    return <IngenLedereInfoBoks />;
  } else if (!sykmeldtHarGyldigSykmelding(sykmeldinger)) {
    return (
      <div>
        <OppfolgingsdialogUtenGyldigSykmelding
          sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(
            sykmeldinger
          )}
        />

        {oppfolgingsplaner &&
          harTidligereOppfolgingsdialoger(oppfolgingsplaner) && (
            <OppfolgingsdialogerUtenAktivSykmelding
              oppfolgingsplanerUtenAktivSykmelding={finnTidligereOppfolgingsdialoger(
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
