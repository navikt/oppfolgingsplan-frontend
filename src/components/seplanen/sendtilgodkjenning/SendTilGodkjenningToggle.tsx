import { Alert, BodyLong, Button, GuidePanel } from "@navikt/ds-react";
import Link from "next/link";
import React, { useState } from "react";
import { useOppfolgingsplanUrl } from "../../../hooks/routeHooks";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { SEPLANEN_JEG_ER_FERDIG_BUTTON } from "../../../../cypress/dataTestId";
import {
  ArbeidsOppgaveDTO,
  TiltakDTO,
} from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanId: number;
  arbeidsoppgaveListe?: ArbeidsOppgaveDTO[] | null;
  tiltakListe?: TiltakDTO[] | null;

  visInnsendingsSkjema(): void;
}

export const SendTilGodkjenningToggle = ({
  oppfolgingsplanId,
  arbeidsoppgaveListe,
  tiltakListe,
  visInnsendingsSkjema,
}: Props) => {
  const [displayMissingInfoMessage, setDisplayMissingInfoMessage] =
    useState(false);

  const arbeidsoppgaveUrl = useOppfolgingsplanUrl(
    oppfolgingsplanId,
    "arbeidsoppgaver",
  );
  const tiltakUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "tiltak");

  return (
    <div>
      <GuidePanel className="mb-8">
        <SpacedDiv className="mb-4">
          Er du ferdig med denne planen og ønsker å sende den til godkjenning?
        </SpacedDiv>
        <Button
          id="jegErFerdigButton"
          data-testid={SEPLANEN_JEG_ER_FERDIG_BUTTON}
          variant={"primary"}
          type={"button"}
          onClick={() => {
            if (tiltakListe?.length && arbeidsoppgaveListe?.length) {
              visInnsendingsSkjema();
            } else {
              setDisplayMissingInfoMessage(true);
            }
          }}
        >
          Jeg er ferdig
        </Button>
      </GuidePanel>

      {displayMissingInfoMessage && (
        <Alert className="mb-8" variant={"warning"}>
          <BodyLong spacing>
            Ups, her mangler det litt før du kan sende planen. Den må inneholde
            minst én oppgave og ett tiltak. Kanskje lederen din kan hjelpe til?
          </BodyLong>

          {!arbeidsoppgaveListe?.length && (
            <SpacedDiv className="mb-4">
              <Link href={arbeidsoppgaveUrl}>Legg til en arbeidsoppgave</Link>
            </SpacedDiv>
          )}
          {!tiltakListe?.length && (
            <div>
              <Link href={tiltakUrl}>Legg til et tiltak</Link>
            </div>
          )}
        </Alert>
      )}
    </div>
  );
};
