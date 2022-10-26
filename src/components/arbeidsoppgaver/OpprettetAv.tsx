import { SpacedDetail } from "../blocks/SpacedDetail";
import { texts } from "components/seplanen/texts";

interface Props {
  opprettetAv: string;
}

export const OpprettetAv = ({ opprettetAv }: Props) => {
  return (
    <SpacedDetail>{`${texts.arbeidsoppgaveList.labels.lagtTilAv} ${opprettetAv}`}</SpacedDetail>
  );
};
