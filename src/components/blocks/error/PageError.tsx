import React, { ReactNode } from "react";
import Image from "next/legacy/image";
import { BodyLong, Heading, Link } from "@navikt/ds-react";

import pageErrorDad from "../images/page-error-dad.svg";
import notFoundMom from "../images/not-found-mom.svg";
import styles from "./error.module.css";

interface Props {
  graphic?: "dad" | "mom";
  text?: string;
  details?: ReactNode;
  action?: ReactNode | null;
  noReload?: boolean;
}

const PageError = ({
  graphic = "dad",
  text,
  details,
  noReload = false,
}: Props): React.JSX.Element => {
  const errorText = text ?? "Det har oppstått en uventet feil";

  return (
    <div className={styles.errorcontainer} role="status" aria-live="polite">
      {graphic === "dad" ? (
        <Image className={styles.errorimage} src={pageErrorDad} alt="" />
      ) : (
        <Image className={styles.errorimage} src={notFoundMom} alt="" />
      )}
      <div>
        <Heading spacing size="large" level="1">
          Oops!
        </Heading>
        <Heading spacing size="small" level="2">
          {errorText}
        </Heading>
        <BodyLong spacing={!details}>
          {!noReload && (
            <>
              Du kan prøve å{" "}
              <Link href={window.location.href}>laste siden på nytt</Link>.
            </>
          )}
        </BodyLong>
        {details ?? (
          <BodyLong spacing>Vi jobber allerede med å fikse feilen.</BodyLong>
        )}
      </div>
    </div>
  );
};

export default PageError;
