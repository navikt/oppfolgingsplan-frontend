import React, { ReactElement, ReactNode } from "react";
import { PageHeading } from "../../heading/PageHeading";
import styles from "./SykmeldtSide.module.css";
import { FlexJarModal } from "../../../flexjar/FlexJarModal";
import { FlexJarTextAreaQuestion } from "../../../flexjar/FlexJarTextAreaQuestion";

interface SideProps {
  title: string;
  heading: string;
  displayFlexjar?: boolean;
  children: ReactNode;
}

const SykmeldtSide = ({
  title,
  heading,
  displayFlexjar,
  children,
}: SideProps): ReactElement => {
  return (
    <div className={styles.content}>
      <div className={styles.innercontent}>
        {displayFlexjar && (
          <FlexJarModal
            feedbackId="oppfolgingsplan-sykmeldt"
            ratingSporsmal="Hvordan opplever du dagens oppfølgingsplan?"
            hovedSporsmal="Hvordan involverer lederen din deg når oppfølgingsplanen lages?"
          >
            <FlexJarTextAreaQuestion
              name="hjelperPlanenMedTilrettelegging"
              label="Hvordan opplever du at oppfølgingsplanen hjelper deg og lederen din med å vurdere tilrettelegging på jobben?"
            />
          </FlexJarModal>
        )}
        <PageHeading title={title} heading={heading} />
        {children}
      </div>
    </div>
  );
};

export default SykmeldtSide;
