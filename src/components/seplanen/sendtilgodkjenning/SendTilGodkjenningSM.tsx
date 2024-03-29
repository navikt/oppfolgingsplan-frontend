import React, { ReactElement, useState } from "react";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { SendTilGodkjenningForm } from "./SendTilGodkjenningForm";
import { LightGreyPanel } from "../../blocks/wrappers/LightGreyPanel";
import { BodyLong, Heading } from "@navikt/ds-react";
import { formatAsLocalDateTime } from "../../../utils/dateUtils";
import { useGodkjennOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}

export const SendTilGodkjenningSM = ({
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
        Send til lederen din for godkjenning
      </Heading>

      <BodyLong spacing>
        Når du har sendt planen, kan lederen din enten godkjenne den, eller
        gjøre endringer og sende den tilbake til deg for ny godkjenning.
      </BodyLong>
      <SendTilGodkjenningForm
        oppfolgingsplan={oppfolgingsplan}
        cancel={() => setVisOppfolgingsplanSkjema(false)}
        visTvungenGodkjenningToggle={false}
        navnPaaMotpart={
          oppfolgingsplan.arbeidsgiver?.naermesteLeder?.navn || "lederen min"
        }
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
