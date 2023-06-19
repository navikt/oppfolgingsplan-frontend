import { CheckmarkCircleFillIcon } from "@navikt/aksel-icons";
import iconstyles from "./icons.module.css";

export const FilledCheckmarkIcon = () => {
  return (
    <div className={iconstyles.iconwrapper}>
      <CheckmarkCircleFillIcon
        aria-hidden
        color={"var(--a-green-600)"}
        width={30}
        height={30}
      />
    </div>
  );
};
