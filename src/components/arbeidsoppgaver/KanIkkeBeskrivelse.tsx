import { BodyLong, Label } from "@navikt/ds-react";
import { Gjennomforing } from "../../schema/oppfolgingsplanSchema";
import { texts } from "components/seplanen/texts";

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
