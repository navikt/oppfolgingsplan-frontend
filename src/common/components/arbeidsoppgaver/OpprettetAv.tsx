import {texts} from "@/common/components/oversikt/texts";
import {SpacedDetail} from "@/common/components/SpacedDetail";

interface Props {
    opprettetAv: string;
}

export const OpprettetAv = ({
                                          opprettetAv
                                      }: Props) => {
    return (
        <SpacedDetail>{`${texts.arbeidsoppgaveList.labels.lagtTilAv} ${opprettetAv}`}</SpacedDetail>
    )
}
