import { Button } from "@navikt/ds-react";
import { MouseEventHandler } from "react";

interface Props {
  show: boolean;
  onClick: MouseEventHandler | undefined;
  text: string;
}

export const VurderButton = ({ show, onClick, text }: Props) => {
  return show ? <Button onClick={onClick}>{text}</Button> : null;
};
