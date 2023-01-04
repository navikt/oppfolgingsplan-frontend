import React, { ReactNode } from "react";
import Image from "next/legacy/image";
import { BodyLong, Heading, Link } from "@navikt/ds-react";

import pageErrorDad from "../images/page-error-dad.svg";
import notFoundMom from "../images/not-found-mom.svg";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  --navds-content-container-max-width: 50rem;
  padding: 1rem;

  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const ErrorImage = styled(Image)`
  margin-right: var(--a-spacing-8);
  flex: 1 1 50%;

  @media only screen and (max-width: 960px) {
    max-height: 240px;
    margin-bottom: var(--a-spacing-4);
  }
`;

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
}: Props): JSX.Element => {
  const errorText = text ?? "Det har oppstått en uventet feil";

  return (
    <ErrorContainer role="status" aria-live="polite">
      {graphic === "dad" ? (
        <ErrorImage src={pageErrorDad} alt="" />
      ) : (
        <ErrorImage src={notFoundMom} alt="" />
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
    </ErrorContainer>
  );
};

export default PageError;
