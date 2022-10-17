import {texts} from "@/common/components/oversikt/texts";
import {Button} from "@navikt/ds-react";
import {MouseEventHandler} from "react";

interface Props {
    show: Boolean;
    onClick: MouseEventHandler | undefined;
}

export const VurderButton = ({show, onClick}: Props) => {
    return show ? (
        <Button
            onClick={onClick}
        >
            {texts.arbeidsoppgaveList.buttons.giDinVurdering}
        </Button>
    ) : null
}
