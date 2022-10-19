import { Row } from "@/common/components/wrappers/Row";
import { ReactNode } from "react";

interface Props {
  show: Boolean;
  children: ReactNode;
}

export const ArbeidsoppgaveKnapper = ({ show, children }: Props) => {
  return show ? <Row>{children}</Row> : null;
};
