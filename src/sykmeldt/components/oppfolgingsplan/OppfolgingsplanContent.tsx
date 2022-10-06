import React from "react";
import {
  erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
  finnTidligereOppfolgingsdialoger,
  harTidligereOppfolgingsdialoger,
  isEmpty,
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
  narmesteLedere: NarmesteLeder[];
}

const OppfolgingsplanContent = ({
  oppfolgingsplaner,
  sykmeldinger,
  narmesteLedere,
}: Props) => {
  if (
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(
      oppfolgingsplaner,
      sykmeldinger,
      narmesteLedere
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

        {!isEmpty(oppfolgingsplaner) &&
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
        narmesteLedere={narmesteLedere}
      />
    );
  }
};

export default OppfolgingsplanContent;
