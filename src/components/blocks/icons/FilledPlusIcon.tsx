import { DS_COLOR_FEEDBACK_WARNING_ICON } from "../../../styles/colors/ColorConstants";
import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import iconstyles from "./icons.module.css";

export const FilledPlusIcon = () => {
  return (
    <div className={iconstyles.iconwrapper}>
      <PlusCircleFillIcon
        color={DS_COLOR_FEEDBACK_WARNING_ICON}
        aria-hidden
        width={30}
        height={30}
      />
    </div>
  );
};
