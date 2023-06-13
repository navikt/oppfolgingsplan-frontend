import { DS_COLOR_FEEDBACK_WARNING_ICON } from "../../../styles/colors/ColorConstants";
import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import { IconWrapper } from "./IconWrapper";

export const AddColored = () => {
  return (
    <IconWrapper>
      <PlusCircleFillIcon
        color={DS_COLOR_FEEDBACK_WARNING_ICON}
        aria-hidden
        width={30}
        height={30}
      />
    </IconWrapper>
  );
};
