import { DS_COLOR_FEEDBACK_WARNING_ICON } from "../../../styles/colors/ColorConstants";
import { PlusCircleFillIcon } from "@navikt/aksel-icons";

export const AddColored = () => {
  return (
    <PlusCircleFillIcon color={DS_COLOR_FEEDBACK_WARNING_ICON} aria-hidden />
  );
};
