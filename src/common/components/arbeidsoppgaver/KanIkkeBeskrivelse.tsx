import { texts } from "@/common/components/oversikt/texts";
import { BodyLong, Label } from "@navikt/ds-react";
import { Gjennomforing } from "../../../schema/oppfolgingsplanSchema";

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
