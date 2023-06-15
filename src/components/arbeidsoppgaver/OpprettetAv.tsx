import { texts } from "../seplanen/texts";
import { Detail } from "@navikt/ds-react";

interface Props {
  opprettetAv: string;
}

export const OpprettetAv = ({ opprettetAv }: Props) => {
  return (
    <Detail
      spacing
    >{`${texts.arbeidsoppgaveList.labels.lagtTilAv} ${opprettetAv}`}</Detail>
  );
};
