import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";
import { logger } from "@navikt/next-logger";
import PageError from "./PageError";

interface Props {
  children: ReactNode;
}

const errorHandler = (error: Error, info: { componentStack: string }) => {
  logger.error(
    `ErrorBoundary: ${error.stack}. ** Component stack **: ${info.componentStack}`
  );
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
