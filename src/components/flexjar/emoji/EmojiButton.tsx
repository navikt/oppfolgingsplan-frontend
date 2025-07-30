import { ReactNode } from "react";
import { BodyShort } from "@navikt/ds-react";

export interface EmojiButtonProps {
  feedback: number;
  activeState: number | null;
  setActiveState: (state: number) => void;
  children: ReactNode;
  text: string;
  className?: string;
}

export const EmojiButton = (props: EmojiButtonProps) => {
  return (
    <button
      type="button"
      className={props.className}
      onClick={() => props.setActiveState(props.feedback)}
    >
      {props.children}
      <BodyShort className="cursor-pointer">{props.text}</BodyShort>
    </button>
  );
};
