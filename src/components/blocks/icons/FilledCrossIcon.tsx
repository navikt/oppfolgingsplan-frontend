import { XMarkOctagonFillIcon } from "@navikt/aksel-icons";
import iconstyles from "./icons.module.css";

export const FilledCrossIcon = () => {
  return (
    <div className={iconstyles.iconwrapper}>
      <XMarkOctagonFillIcon
        aria-hidden
        color={
          "var(--ac-alert-icon-error-color,var(--ax-text-danger-decoration))"
        }
        width={30}
        height={30}
      />
    </div>
  );
};
