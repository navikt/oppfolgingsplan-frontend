import { DS_COLOR_FEEDBACK_WARNING_ICON } from "styles/colors/ColorConstants";
import { AddCircleFilled } from "@navikt/ds-icons";

export const AddColored = () => {
  return <AddCircleFilled color={DS_COLOR_FEEDBACK_WARNING_ICON} aria-hidden />;
};
