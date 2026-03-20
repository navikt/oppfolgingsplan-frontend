import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
// Should not be used. Should be replaced by designsystem alert
export const CustomAlertWithoutIcon = ({ children }: Props) => {
  return (
    <div className={"aksel-alert"} data-color="warning">
      <div className={"aksel-alert__wrapper aksel-body-long"}>{children}</div>
    </div>
  );
};
