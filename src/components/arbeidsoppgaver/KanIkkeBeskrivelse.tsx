import { BodyLong, Label } from "@navikt/ds-react";
import { texts } from "components/seplanen/texts";
import { Gjennomforing } from "../../types/oppfolgingsplan";

interface Props {
  gjennomfoering?: Gjennomforing | null;
}

export const KanIkkeBeskrivelse = ({ gjennomfoering }: Props) => {
  if (!gjennomfoering) return null;

  return (
    <>
      <Label>{texts.arbeidsoppgaveList.labels.hvaStarIVeien}</Label>
      <BodyLong spacing={true}>{gjennomfoering.kanIkkeBeskrivelse}</BodyLong>
    </>
  );
};
