"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "./PageError";
import { logError } from "../../../utils/logUtils";

interface Props {
  children: ReactNode;
}

const errorHandler = (error: Error) => {
  logError(error, "ErrorBoundary");
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
