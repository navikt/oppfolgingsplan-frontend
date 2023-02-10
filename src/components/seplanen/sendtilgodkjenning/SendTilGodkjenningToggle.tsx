import { Alert, BodyLong, Button, GuidePanel, Link } from "@navikt/ds-react";
import React, { useState } from "react";
import styled from "styled-components";
import { useOppfolgingsplanUrl } from "hooks/routeHooks";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Arbeidsoppgave, Tiltak } from "../../../types/oppfolgingsplan";

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
        <SpacedDiv marginBottom={"1rem"}>
          Er du ferdig med denne planen og ønsker å sende den til godkjenning?
        </SpacedDiv>
        <Button
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
            <SpacedDiv marginBottom={"1rem"}>
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
