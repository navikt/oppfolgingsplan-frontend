import React, { useState } from "react";
import {
  finnAktiveOppfolgingsplaner,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "utils/oppfolgingplanUtils";
import OppfolgingsdialogTeasere from "./OppfolgingsdialogTeasere";
import { Button } from "@navikt/ds-react";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import OpprettOppfolgingsplanModal from "../opprett/OpprettOppfolgingsplanModal";
import OppfolgingsdialogerIngenplan from "../opprett/OppfolgingsdialogerIngenplan";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

const texts = {
  oppfolgingsdialogNyKnapp: {
    button: "Lag en ny oppfølgingsplan",
  },
  oppfolgingsdialogerVisning: {
    teaserOutdatedPlaner: {
      title: "Tidligere oppfølgingsplaner",
    },
    teaserAktive: {
      titleMultiplePlaner: "Aktive oppfølgingsplaner",
      titleSinglePlan: "Aktiv oppfølgingsplan",
    },
  },
};

interface Props {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
  narmesteLedere: NarmesteLeder[];
}

const OppfolgingsdialogerVisning = ({
  oppfolgingsplaner,
  sykmeldinger,
  narmesteLedere,
}: Props) => {
  const [visOpprettingModal, setVisOpprettingModal] = useState(false);

  const aktiveOppfolgingsplaner: Oppfolgingsplan[] =
    finnAktiveOppfolgingsplaner(oppfolgingsplaner, sykmeldinger);

  const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
    sykmeldinger,
    narmesteLedere
  );

  return (
    <div>
      <OpprettOppfolgingsplanModal
        oppfolgingsplaner={oppfolgingsplaner}
        arbeidsgivere={arbeidsgivereForSykmeldinger}
        visOpprettingModal={visOpprettingModal}
        setVisOpprettingModal={setVisOpprettingModal}
      />

      {aktiveOppfolgingsplaner.length === 0 && (
        <OppfolgingsdialogerIngenplan
          arbeidsgivere={arbeidsgivereForSykmeldinger}
          oppfolgingsplaner={oppfolgingsplaner}
          setVisOpprettingModal={setVisOpprettingModal}
        />
      )}
      {aktiveOppfolgingsplaner.length > 0 && (
        <div>
          {arbeidsgivereForSykmeldinger.length > 1 && (
            <SpacedDiv marginTop={"1rem"}>
              <Button
                variant={"secondary"}
                size={"medium"}
                onClick={() => {
                  setVisOpprettingModal(true);
                }}
              >
                {texts.oppfolgingsdialogNyKnapp.button}
              </Button>
            </SpacedDiv>
          )}
          <OppfolgingsdialogTeasere
            oppfolgingsplaner={aktiveOppfolgingsplaner}
            tittel={
              aktiveOppfolgingsplaner.length > 1
                ? texts.oppfolgingsdialogerVisning.teaserAktive
                    .titleMultiplePlaner
                : texts.oppfolgingsdialogerVisning.teaserAktive.titleSinglePlan
            }
          />
        </div>
      )}
      {harTidligereOppfolgingsplaner(oppfolgingsplaner) && (
        <OppfolgingsdialogTeasere
          oppfolgingsplaner={finnTidligereOppfolgingsplaner(oppfolgingsplaner)}
          harTidligerOppfolgingsdialoger
          tittel={texts.oppfolgingsdialogerVisning.teaserOutdatedPlaner.title}
        />
      )}
    </div>
  );
};

export default OppfolgingsdialogerVisning;
