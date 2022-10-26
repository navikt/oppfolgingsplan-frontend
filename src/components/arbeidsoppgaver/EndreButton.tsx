import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { MouseEventHandler } from "react";
import { texts } from "components/seplanen/texts";

interface Props {
  show: Boolean;
  onClick: MouseEventHandler | undefined;
}

export const EndreButton = ({ show, onClick }: Props) => {
  return show ? (
    <Button variant={"tertiary"} icon={<Edit />} onClick={onClick}>
      {texts.arbeidsoppgaveList.buttons.endre}
    </Button>
  ) : null;
};
