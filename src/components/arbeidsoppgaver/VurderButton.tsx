import { Button } from "@navikt/ds-react";
import { MouseEventHandler } from "react";
import { texts } from "components/seplanen/texts";

interface Props {
  show: boolean;
  onClick: MouseEventHandler | undefined;
}

export const VurderButton = ({ show, onClick }: Props) => {
  return show ? (
    <Button onClick={onClick}>
      {texts.arbeidsoppgaveList.buttons.giDinVurdering}
    </Button>
  ) : null;
};
