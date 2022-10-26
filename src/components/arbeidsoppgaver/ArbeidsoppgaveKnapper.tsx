import { ReactNode } from "react";
import { Row } from "components/blocks/wrappers/Row";

interface Props {
  show: Boolean;
  children: ReactNode;
}

export const ArbeidsoppgaveKnapper = ({ show, children }: Props) => {
  return show ? <Row>{children}</Row> : null;
};
