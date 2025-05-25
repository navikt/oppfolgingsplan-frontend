import { Textarea } from "@navikt/ds-react";
import React from "react";
import { useFormContext, Path } from "react-hook-form";
import { FlexjarFormValues } from "./FlexJarModal";

interface Props<
  TFieldValues extends Record<string, unknown> = FlexjarFormValues,
> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  errorMessage?: string;
  maxLength?: number;
  minRows?: number;
}

export const FlexJarTextAreaQuestion = <
  TFieldValues extends Record<string, unknown> = FlexjarFormValues,
>({
  name,
  label,
  required = true,
  errorMessage = "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.",
  maxLength = 1000,
  minRows = 2,
}: Props<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <Textarea
      {...register(name, {
        required: required ? errorMessage : false,
      })}
      label={label}
      error={errors[name]?.message as React.ReactNode}
      maxLength={maxLength}
      minRows={minRows}
    />
  );
};
