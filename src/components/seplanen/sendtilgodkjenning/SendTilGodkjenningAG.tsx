import React, { ReactElement, useState } from "react";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { SendTilGodkjenningForm } from "./SendTilGodkjenningForm";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { LightGreyPanel } from "../../blocks/wrappers/LightGreyPanel";
import { Alert, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  oppfolgingsplan?: Oppfolgingsplan;
  isOwnLeader?: boolean;
}

export const SendTilGodkjenningAG = ({
  oppfolgingsplan,
  isOwnLeader,
}: Props): ReactElement | null => {
  const [visOppfolgingsplanSkjema, setVisOppfolgingsplanSkjema] =
    useState(false);

  if (!oppfolgingsplan) return null;

  if (!visOppfolgingsplanSkjema) {
    return (
      <SendTilGodkjenningToggle
        oppfolgingsplanId={oppfolgingsplan.id}
        tiltakListe={oppfolgingsplan.tiltakListe}
        arbeidsoppgaveListe={oppfolgingsplan.arbeidsoppgaveListe}
        visInnsendingsSkjema={() => setVisOppfolgingsplanSkjema(true)}
      />
    );
  }

  return (
    <LightGreyPanel border>
      <Heading spacing size={"medium"} level={"2"}>
        Jeg er ferdig med planen
      </Heading>
      {isOwnLeader && (
        <SpacedDiv marginBottom={"1rem"}>
          <Alert variant={"info"}>
            Fordi du er din egen leder, kan du opprette planen nå.
          </Alert>
        </SpacedDiv>
      )}

      <SendTilGodkjenningForm
        oppfolgingsplan={oppfolgingsplan}
        cancel={() => setVisOppfolgingsplanSkjema(false)}
        visTvungenGodkjenningToggle={!isOwnLeader}
        isOwnLeader={isOwnLeader}
      />
    </LightGreyPanel>
  );
};
