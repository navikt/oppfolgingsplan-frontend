import { Alert, BodyLong, Button, GuidePanel } from "@navikt/ds-react";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { useOppfolgingsplanUrl } from "../../../hooks/routeHooks";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { Arbeidsoppgave, Tiltak } from "../../../types/oppfolgingsplan";
import { SEPLANEN_JEG_ER_FERDIG_BUTTON } from "../../../../cypress/dataTestId";

const SpacedGuidePanel = styled(GuidePanel)`
  margin-bottom: 2rem;
`;

const SpacedAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

interface Props {
  oppfolgingsplanId: number;
  arbeidsoppgaveListe?: Arbeidsoppgave[] | null;
  tiltakListe?: Tiltak[] | null;

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
    "arbeidsoppgaver"
  );
  const tiltakUrl = useOppfolgingsplanUrl(oppfolgingsplanId, "tiltak");

  return (
    <div>
      <SpacedGuidePanel>
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
      </SpacedGuidePanel>

      {displayMissingInfoMessage && (
        <SpacedAlert variant={"warning"}>
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
        </SpacedAlert>
      )}
    </div>
  );
};
