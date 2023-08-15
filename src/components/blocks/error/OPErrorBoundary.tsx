"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";
import PageError from "./PageError";
import { logFaroError } from "../../../faro/initFaro";

interface Props {
  children: ReactNode;
}

const errorHandler = (error: Error) => {
  logFaroError(error);
};

export const OPErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => <PageError />}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
