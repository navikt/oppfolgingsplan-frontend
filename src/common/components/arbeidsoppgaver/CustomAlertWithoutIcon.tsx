import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
// Should not be used. Should be replaced by designsystem alert
export const CustomAlertWithoutIcon = ({ children }: Props) => {
  return (
    <div className={"navds-alert navds-alert--warning navds-alert--medium"}>
      <div className={"navds-alert__wrapper navds-body-long"}>{children}</div>
    </div>
  );
};
