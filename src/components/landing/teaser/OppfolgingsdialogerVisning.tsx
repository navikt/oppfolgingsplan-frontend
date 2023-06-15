import React, { useState } from "react";
import {
  finnAktiveOppfolgingsplaner,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "../../../utils/oppfolgingplanUtils";
import OppfolgingsdialogTeasere from "./OppfolgingsdialogTeasere";
import { Button } from "@navikt/ds-react";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { SykmeldingDTO } from "../../../schema/sykmeldingSchema";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "../../../utils/sykmeldingUtils";
import OpprettModalSM from "../../../components/landing/opprett/OpprettModalSM";
import IngenPlanerCardSM from "../../../components/landing/opprett/IngenPlanerCardSM";
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
  sykmeldinger: SykmeldingDTO[];
  narmesteLedere: NarmesteLederDTO[];
}

const OppfolgingsdialogerVisning = ({
  oppfolgingsplaner,
  sykmeldinger,
  narmesteLedere,
}: Props) => {
  const [visOpprettModal, setVisOpprettModal] = useState(false);

  const aktiveOppfolgingsplaner: Oppfolgingsplan[] =
    finnAktiveOppfolgingsplaner(oppfolgingsplaner, sykmeldinger);

  const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
    sykmeldinger,
    narmesteLedere
  );

  return (
    <div>
      <OpprettModalSM
        oppfolgingsplaner={oppfolgingsplaner}
        arbeidsgivere={arbeidsgivereForSykmeldinger}
        visOpprettModal={visOpprettModal}
        setVisOpprettModal={setVisOpprettModal}
      />

      {aktiveOppfolgingsplaner.length === 0 && (
        <IngenPlanerCardSM
          arbeidsgivere={arbeidsgivereForSykmeldinger}
          oppfolgingsplaner={oppfolgingsplaner}
          setVisOpprettModal={setVisOpprettModal}
        />
      )}
      {aktiveOppfolgingsplaner.length > 0 && (
        <div>
          {arbeidsgivereForSykmeldinger.length > 1 && (
            <div className="mb-8">
              <Button
                variant={"secondary"}
                size={"medium"}
                onClick={() => {
                  setVisOpprettModal(true);
                }}
              >
                {texts.oppfolgingsdialogNyKnapp.button}
              </Button>
            </div>
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
