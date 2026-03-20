import { CheckmarkCircleFillIcon } from "@navikt/aksel-icons";
import iconstyles from "./icons.module.css";

export const FilledCheckmarkIcon = () => {
  return (
    <div className={iconstyles.iconwrapper}>
      <CheckmarkCircleFillIcon
        aria-hidden
        color={"var(--ax-success-700)"}
        width={30}
        height={30}
      />
    </div>
  );
};
