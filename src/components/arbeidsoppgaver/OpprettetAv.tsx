import { SpacedDetail } from "../blocks/SpacedDetail";
import { texts } from "../seplanen/texts";

interface Props {
  opprettetAv: string;
}

export const OpprettetAv = ({ opprettetAv }: Props) => {
  return (
    <SpacedDetail>{`${texts.arbeidsoppgaveList.labels.lagtTilAv} ${opprettetAv}`}</SpacedDetail>
  );
};
