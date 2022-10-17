import {ButtonRow} from "@/common/components/wrappers/ButtonRow";
import {ReactNode} from "react";

interface Props {
    show: Boolean;
    children: ReactNode;
}

export const Knapperad = ({ show, children }: Props) => {

    return show ? (
        <ButtonRow>
            {children}
        </ButtonRow>
    ) : null
}
