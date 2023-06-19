import Image from "next/image";
import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import React from "react";
import styles from "./infoboks.module.css";

interface Props {
  imageSrc: string;
  heading: string;
  description?: string;
}

export const InfoBoksWithImage = ({
  imageSrc,
  heading,
  description,
}: Props) => {
  return (
    <Panel className="mb-8" border={true}>
      <div className={styles.panelcontent}>
        <Image src={imageSrc} alt={""} />
        <Heading size={"medium"} level={"2"}>
          {heading}
        </Heading>

        {description && <BodyLong>{description}</BodyLong>}
      </div>
    </Panel>
  );
};
