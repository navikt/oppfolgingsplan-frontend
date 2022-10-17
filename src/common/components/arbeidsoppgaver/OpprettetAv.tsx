import {texts} from "@/common/components/oversikt/texts";
import {Detail} from "@navikt/ds-react";

interface Props {
    opprettetAv: string;
}

export const OpprettetAv = ({
                                          opprettetAv
                                      }: Props) => {
    return (
        <Detail>{`${texts.arbeidsoppgaveList.labels.lagtTilAv} ${opprettetAv}`}</Detail>
    )
}
