import { BodyLong, Label } from "@navikt/ds-react";
import { texts } from "../seplanen/texts";
import { Gjennomforing } from "../../types/oppfolgingsplan";

interface Props {
  gjennomfoering: Gjennomforing;
}

export const TilretteleggingsBeskrivelse = ({ gjennomfoering }: Props) => {
  return (
    <>
      <Label>{texts.arbeidsoppgaveList.labels.hvaSkalTil}</Label>
      <ul>
        {gjennomfoering.paaAnnetSted && (
          <li>{texts.arbeidsoppgaveList.labels.sted}</li>
        )}
        {gjennomfoering.medMerTid && (
          <li>{texts.arbeidsoppgaveList.labels.tid}</li>
        )}
        {gjennomfoering.medHjelp && (
          <li>{texts.arbeidsoppgaveList.labels.hjelp}</li>
        )}
      </ul>
      {gjennomfoering.kanBeskrivelse && (
        <>
          <Label>{texts.arbeidsoppgaveList.labels.beskrivelse}</Label>
          <BodyLong spacing={true}>{gjennomfoering.kanBeskrivelse}</BodyLong>
        </>
      )}
    </>
  );
};
