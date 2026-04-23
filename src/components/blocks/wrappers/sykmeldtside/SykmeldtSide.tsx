import React, { ReactElement, ReactNode } from "react";
import { PageHeading } from "../../heading/PageHeading";
import styles from "./SykmeldtSide.module.css";
import { DeprecationBannerSM } from "../../infoboks/DeprecationBannerSM";

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
        <PageHeading title={title} heading={heading} />
        <DeprecationBannerSM />
        {children}
      </div>
    </div>
  );
};

export default SykmeldtSide;
