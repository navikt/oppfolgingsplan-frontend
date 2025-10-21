import React, { useState } from "react";
import OppfolgingsdialogTeasereSM from "./OppfolgingsdialogTeasereSM";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import { SykmeldingDTO } from "../../../../schema/sykmeldingSchema";
import { NarmesteLederDTO } from "../../../../schema/narmestelederSchema";
import {
  finnAktiveOppfolgingsplaner,
  finnTidligereOppfolgingsplaner,
  harTidligereOppfolgingsplaner,
} from "../../../../utils/oppfolgingplanUtils";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "../../../../utils/sykmeldingUtils";
import OpprettModalSM from "../../opprett/OpprettModalSM";
import IngenPlanerCardSM from "../../opprett/IngenPlanerCardSM";
import { Button } from "@navikt/ds-react";

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
  oppfolgingsplaner: OppfolgingsplanDTO[];
  sykmeldinger: SykmeldingDTO[];
  narmesteLedere: NarmesteLederDTO[];
}

const OppfolgingsdialogerVisningSM = ({
  oppfolgingsplaner,
  sykmeldinger,
  narmesteLedere,
}: Props) => {
  const [visOpprettModal, setVisOpprettModal] = useState(false);

  const aktiveOppfolgingsplaner: OppfolgingsplanDTO[] =
    finnAktiveOppfolgingsplaner(oppfolgingsplaner, sykmeldinger);

  const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
    sykmeldinger,
    narmesteLedere,
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
          <OppfolgingsdialogTeasereSM
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
        <OppfolgingsdialogTeasereSM
          oppfolgingsplaner={finnTidligereOppfolgingsplaner(oppfolgingsplaner)}
          harTidligerOppfolgingsdialoger
          tittel={texts.oppfolgingsdialogerVisning.teaserOutdatedPlaner.title}
        />
      )}
    </div>
  );
};

export default OppfolgingsdialogerVisningSM;
