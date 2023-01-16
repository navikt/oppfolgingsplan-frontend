import { BodyLong, Label } from "@navikt/ds-react";
import { texts } from "components/seplanen/texts";
import { Gjennomforing } from "../../types/oppfolgingsplan";

interface Props {
  gjennomfoering: Gjennomforing;
}

export const KanIkkeBeskrivelse = ({ gjennomfoering }: Props) => {
  return (
    <>
      <Label>{texts.arbeidsoppgaveList.labels.hvaStarIVeien}</Label>
      <BodyLong spacing={true}>{gjennomfoering.kanIkkeBeskrivelse}</BodyLong>
    </>
  );
};
