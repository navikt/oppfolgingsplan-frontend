import Image from "next/image";
import { BodyLong, Button, Heading, Panel } from "@navikt/ds-react";
import React from "react";
import styles from "./infoboks.module.css";

interface Props {
  imageSrc: string;
  heading: string;
  description?: string;
  buttonText: string;
  onClose(show: boolean): void;
}

export const InfoBoksWithImageAndButton = ({
  imageSrc,
  heading,
  description,
  buttonText,
  onClose,
}: Props) => {
  return (
    <Panel className="mb-8" border={true}>
      <div className={styles.panelcontent}>
        <Image src={imageSrc} width={64} height={64} alt={""} />
        <Heading size={"medium"} level={"2"}>
          {heading}
        </Heading>

        {description && <BodyLong>{description}</BodyLong>}
        <Button variant={"secondary"} onClick={() => onClose(false)}>
          {buttonText}
        </Button>
      </div>
    </Panel>
  );
};
