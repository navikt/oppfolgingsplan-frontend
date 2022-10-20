import React, { ReactElement, useState } from "react";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { SendTilGodkjenningToggle } from "./SendTilGodkjenningToggle";
import { SendTilGodkjenningForm } from "./SendTilGodkjenningForm";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const SendTilGodkjenning = ({
  oppfolgingsplan,
}: Props): ReactElement => {
  const [visOppfolgingsplanSkjema, setVisOppfolgingsplanSkjema] =
    useState(false);

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
    <SendTilGodkjenningForm
      oppfolgingsplan={oppfolgingsplan}
      cancel={() => setVisOppfolgingsplanSkjema(false)}
    />
  );
};
