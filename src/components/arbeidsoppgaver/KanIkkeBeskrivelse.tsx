import { BodyLong, Label } from "@navikt/ds-react";
import { texts } from "../seplanen/texts";
import { GjennomforingDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  gjennomfoering?: GjennomforingDTO | null;
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
