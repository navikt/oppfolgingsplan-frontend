import React, { ReactElement, ReactNode } from "react";
import { PageHeading } from "../../heading/PageHeading";
import styles from "./SykmeldtSide.module.css";
import { PilotLinkCardSM } from "../../pilotuser/PilotLinkCardSM";

interface SideProps {
  title: string;
  heading: string;
  children: ReactNode;
}

const SykmeldtSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  return (
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <PilotLinkCardSM />
        <PageHeading title={title} heading={heading} />
        {children}
      </div>
    </div>
  );
};

export default SykmeldtSide;
