import React, { useState } from "react";
import {
  finnAktiveOppfolgingsdialoger,
  finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
  finnTidligereOppfolgingsdialoger,
  harTidligereOppfolgingsdialoger,
} from "@/common/utils/oppfolgingsdialogUtils";
import getContextRoot from "@/common/utils/getContextRoot";
import OppfolgingsdialogTeasere from "./OppfolgingsdialogTeasere";
import { Alert, Button } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { finnArbeidsgivereForGyldigeSykmeldinger } from "@/common/utils/sykmeldingUtils";
import OppfolgingsdialogerOpprett from "./opprett/OppfolgingsdialogerOpprett";
import OppfolgingsdialogerIngenplan from "./opprett/OppfolgingsdialogerIngenplan";

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
  const [visOppfolgingsdialogOpprett, setVisOppfolgingsdialogOpprett] =
    useState(false);

  const aktiveOppfolgingsplaner: Oppfolgingsplan[] =
    finnAktiveOppfolgingsdialoger(oppfolgingsplaner, sykmeldinger);

  const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
    sykmeldinger,
    narmesteLedere
  );

  const dialogerAvbruttAvMotpartSidenSistInnlogging =
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsplaner);

  return (
    <div>
      {dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && (
        <Alert variant={"info"}>
          `$
          {dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn} har
          startet en ny oppfølgingsplan. Den gamle er arkivert.`
        </Alert>
      )}

      {visOppfolgingsdialogOpprett && (
        <OppfolgingsdialogerOpprett
          oppfolgingsplaner={oppfolgingsplaner}
          arbeidsgivere={arbeidsgivereForSykmeldinger}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          setVisOppfolgingsdialogOpprett={setVisOppfolgingsdialogOpprett}
        />
      )}
      {(oppfolgingsplaner.length === 0 ||
        !(aktiveOppfolgingsplaner.length > 0)) && (
        <OppfolgingsdialogerIngenplan
          arbeidsgivere={arbeidsgivereForSykmeldinger}
          oppfolgingsplaner={oppfolgingsplaner}
          setVisOppfolgingsdialogOpprett={setVisOppfolgingsdialogOpprett}
        />
      )}
      {aktiveOppfolgingsplaner.length > 0 && (
        <div>
          {arbeidsgivereForSykmeldinger.length > 1 && (
            <div className="oppfolgingsdialogNyDialog">
              <Button
                variant={"secondary"}
                size={"medium"}
                onClick={() => {
                  setVisOppfolgingsdialogOpprett(true);
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
            rootUrlPlaner={getContextRoot()}
          />
        </div>
      )}
      {harTidligereOppfolgingsdialoger(oppfolgingsplaner) && (
        <OppfolgingsdialogTeasere
          oppfolgingsplaner={finnTidligereOppfolgingsdialoger(
            oppfolgingsplaner
          )}
          harTidligerOppfolgingsdialoger
          tittel={texts.oppfolgingsdialogerVisning.teaserOutdatedPlaner.title}
          id="OppfolgingsdialogTeasereAT"
          rootUrlPlaner={getContextRoot()}
        />
      )}
    </div>
  );
};

export default OppfolgingsdialogerVisning;
