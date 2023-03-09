import { ReactNode } from "react";
import { Row } from "../blocks/wrappers/Row";

interface Props {
  show: boolean;
  children: ReactNode;
}

export const ArbeidsoppgaveKnapper = ({ show, children }: Props) => {
  return show ? <Row>{children}</Row> : null;
};
