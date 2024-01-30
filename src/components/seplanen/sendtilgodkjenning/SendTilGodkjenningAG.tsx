import React, { ReactElement, useState } from "react";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { SendTilGodkjenningForm } from "./SendTilGodkjenningForm";
import { LightGreyPanel } from "../../blocks/wrappers/LightGreyPanel";
import { Heading } from "@navikt/ds-react";
import { formatAsLocalDateTime } from "../../../utils/dateUtils";
import { useGodkjennOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}

export const SendTilGodkjenningAG = ({
  oppfolgingsplan,
}: Props): ReactElement | null => {
  const [visOppfolgingsplanSkjema, setVisOppfolgingsplanSkjema] =
    useState(false);

  const sendTilGodkjenning = useGodkjennOppfolgingsplan(oppfolgingsplan.id);
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

      <SendTilGodkjenningForm
        oppfolgingsplan={oppfolgingsplan}
        cancel={() => setVisOppfolgingsplanSkjema(false)}
        visTvungenGodkjenningToggle={true}
        navnPaaMotpart={oppfolgingsplan.arbeidstaker.navn}
        isSubmitting={sendTilGodkjenning.isPending}
        sendTilGodkjenning={(data) => {
          sendTilGodkjenning.mutate({
            gyldighetstidspunkt: {
              fom: formatAsLocalDateTime(data.startDato),
              tom: formatAsLocalDateTime(data.sluttDato),
              evalueres: formatAsLocalDateTime(data.evalueresInnen),
            },
            tvungenGodkjenning: data.tvungenGodkjenning,
            delmednav: data.delMedNAV === "true",
          });
        }}
      />
    </LightGreyPanel>
  );
};
