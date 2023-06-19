import { Panel } from "@navikt/ds-react";
import { ReactNode } from "react";

interface Props {
  border?: boolean;
  children: ReactNode;
}
export const SpacedPanel = ({ border, children }: Props) => {
  return (
    <Panel className="p-8 mb-4" border={border}>
      {children}
    </Panel>
  );
};
