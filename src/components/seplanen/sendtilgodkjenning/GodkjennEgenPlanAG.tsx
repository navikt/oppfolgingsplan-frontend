import React, { ReactElement, useState } from "react";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { LightGreyPanel } from "../../blocks/wrappers/LightGreyPanel";
import { Alert, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { GodkjennEgenPlanAGForm } from "./GodkjennEgenPlanAGForm";

interface Props {
  oppfolgingsplan?: Oppfolgingsplan;
}

export const GodkjennEgenPlanAG = ({
  oppfolgingsplan,
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
      <SpacedDiv marginBottom={"1rem"}>
        <Alert variant={"info"}>
          Fordi du er din egen leder, kan du opprette planen nå.
        </Alert>
      </SpacedDiv>

      <GodkjennEgenPlanAGForm
        oppfolgingsplan={oppfolgingsplan}
        cancel={() => setVisOppfolgingsplanSkjema(false)}
      />
    </LightGreyPanel>
  );
};
