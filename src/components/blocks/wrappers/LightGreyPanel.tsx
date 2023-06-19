import { Panel, PanelProps } from "@navikt/ds-react";

export const LightGreyPanel = ({ children, border }: PanelProps) => {
  return (
    <Panel border={border} className="bg-ds-gray-50">
      {children}
    </Panel>
  );
};
