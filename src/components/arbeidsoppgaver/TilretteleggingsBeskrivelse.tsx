import { BodyLong, Label } from "@navikt/ds-react";
import { texts } from "../seplanen/texts";
import { Gjennomforing } from "../../types/oppfolgingsplan";

interface Props {
  gjennomfoering?: Gjennomforing | null;
}

export const TilretteleggingsBeskrivelse = ({ gjennomfoering }: Props) => {
  if (!gjennomfoering) return null;

  const { paaAnnetSted, medMerTid, medHjelp, kanBeskrivelse } = gjennomfoering;

  return (
    <>
      {(paaAnnetSted || medMerTid || medHjelp) && (
        <>
          <Label>{texts.arbeidsoppgaveList.labels.hvaSkalTil}</Label>
          <ul role="list">
            {paaAnnetSted && <li>{texts.arbeidsoppgaveList.labels.sted}</li>}
            {medMerTid && <li>{texts.arbeidsoppgaveList.labels.tid}</li>}
            {medHjelp && <li>{texts.arbeidsoppgaveList.labels.hjelp}</li>}
          </ul>
        </>
      )}

      {kanBeskrivelse && (
        <div className="mt-4">
          <Label>{texts.arbeidsoppgaveList.labels.beskrivelse}</Label>
          <BodyLong spacing={true}>{kanBeskrivelse}</BodyLong>
        </div>
      )}
    </>
  );
};
