import React, { ForwardedRef } from "react";
import { ErrorSummary } from "@navikt/ds-react";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
  errors: FieldErrors<T>;
}

export const FormErrorSummary = React.forwardRef(
  <T extends FieldValues>(
    { errors }: Props<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const errorCount: number = Object.keys(errors).length;

    if (errorCount == 0) return null;

    return (
      <ErrorSummary
        className="mb-4"
        heading={`Du har ${errorCount} feil som må rettes opp i`}
        ref={ref}
      >
        {Object.entries(errors).map(([fieldName, err], index) => (
          <ErrorSummary.Item key={index} href={`#${fieldName}`}>
            {err.message}
          </ErrorSummary.Item>
        ))}
      </ErrorSummary>
    );
  }
);

FormErrorSummary.displayName = "FormErrorSummary";
