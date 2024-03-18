import React, { ReactElement, useState } from "react";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { LightGreyPanel } from "../../blocks/wrappers/LightGreyPanel";
import { Alert, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { formatAsLocalDateTime } from "../../../utils/dateUtils";
import { SendTilGodkjenningForm } from "./SendTilGodkjenningForm";
import { useGodkjennEgenOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}

export const GodkjennEgenPlan = ({
  oppfolgingsplan,
}: Props): ReactElement | null => {
  const [visOppfolgingsplanSkjema, setVisOppfolgingsplanSkjema] =
    useState(false);

  const godkjennEgenPlan = useGodkjennEgenOppfolgingsplan(oppfolgingsplan.id);

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
      <SpacedDiv className="mb-4">
        <Alert variant={"info"}>
          Fordi du er din egen leder, kan du opprette planen nå.
        </Alert>
      </SpacedDiv>

      <SendTilGodkjenningForm
        oppfolgingsplan={oppfolgingsplan}
        cancel={() => setVisOppfolgingsplanSkjema(false)}
        visTvungenGodkjenningToggle={false}
        isOwnLeder={true}
        isSubmitting={godkjennEgenPlan.isPending}
        navnPaaMotpart={oppfolgingsplan.arbeidstaker.navn}
        sendTilGodkjenning={(data) => {
          godkjennEgenPlan.mutate({
            gyldighetstidspunkt: {
              fom: formatAsLocalDateTime(data.startDato),
              tom: formatAsLocalDateTime(data.sluttDato),
              evalueres: formatAsLocalDateTime(data.evalueresInnen),
            },
            delmednav: data.delMedNAV === "true",
          });
        }}
      />
    </LightGreyPanel>
  );
};
