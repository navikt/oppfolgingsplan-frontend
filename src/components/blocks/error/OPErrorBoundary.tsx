"use client";

import { ReactNode } from "react";
import { FaroErrorBoundary } from "@grafana/faro-react";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "./PageError";

interface Props {
  children: ReactNode;
}

export const OPErrorBoundary = ({ children }: Props) => {
  return (
    <FaroErrorBoundary>
      <ErrorBoundary FallbackComponent={() => <PageError />}>
        {children}
      </ErrorBoundary>
      );
    </FaroErrorBoundary>
  );
};
