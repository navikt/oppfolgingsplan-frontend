import { ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import iconstyles from "./icons.module.css";

export const FilledWarningIcon = () => {
  return (
    <div className={iconstyles.iconwrapper}>
      <ExclamationmarkTriangleFillIcon
        color="var(--ac-alert-icon-warning-color,var(--a-icon-warning))"
        aria-hidden
        width={30}
        height={30}
      />
    </div>
  );
};
