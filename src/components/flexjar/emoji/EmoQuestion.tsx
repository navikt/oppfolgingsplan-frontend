import { EmojiButton } from "./EmojiButton";
import { Glad, Lei, Noytral, Sinna, VeldigGlad } from "./emojies";
import React from "react";
import styles from "./emo.module.css";
import { HStack, Label, VStack } from "@navikt/ds-react";

interface Props {
  question: string;
  activeState: number | null;
  setActiveState: (state: number) => void;
  className?: string;
}

export const EmoQuestion = ({
  question,
  activeState,
  setActiveState,
  className,
}: Props) => {
  return (
    <VStack gap="4" className={className}>
      <Label>{question}</Label>
      <HStack gap="4" justify="start" className="my-4">
        <EmojiButton
          feedback={1}
          text="Veldig dårlig"
          className={styles.sinnaButton}
          activeState={activeState}
          setActiveState={setActiveState}
        >
          <Sinna fill={activeState === 1 ? "var(--a-red-100)" : undefined} />
        </EmojiButton>
        <EmojiButton
          feedback={2}
          text="Dårlig"
          className={styles.leiButton}
          activeState={activeState}
          setActiveState={setActiveState}
        >
          <Lei fill={activeState === 2 ? "var(--a-orange-100)" : undefined} />
        </EmojiButton>
        <EmojiButton
          feedback={3}
          text="Nøytral"
          className={styles.noytralButton}
          activeState={activeState}
          setActiveState={setActiveState}
        >
          <Noytral fill={activeState === 3 ? "var(--a-blue-100)" : undefined} />
        </EmojiButton>
        <EmojiButton
          feedback={4}
          text="Bra"
          className={styles.gladButton}
          activeState={activeState}
          setActiveState={setActiveState}
        >
          <Glad fill={activeState === 4 ? "var(--a-green-100)" : undefined} />
        </EmojiButton>
        <EmojiButton
          feedback={5}
          text="Veldig bra"
          className={styles.veldigGladButton}
          activeState={activeState}
          setActiveState={setActiveState}
        >
          <VeldigGlad
            fill={activeState === 5 ? "var(--a-green-200)" : undefined}
          />
        </EmojiButton>
      </HStack>
    </VStack>
  );
};
