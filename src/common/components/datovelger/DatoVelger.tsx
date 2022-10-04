import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from "date-fns/locale/nb";
import { TextField } from "@navikt/ds-react";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";

registerLocale("nb", nb);

interface Props {
  name: string;
  label: string;
  error?: string;
}

const SpacedTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: 12rem;
`;

export const DatoVelger = ({ label, name, error }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ required: "Dato er påkrevd" }}
      name={name}
      render={({ field: { onChange, onBlur, name, value, ref } }) => (
        <ReactDatePicker
          ref={(elem: any) => {
            elem && ref(elem.input);
          }}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          selected={value}
          customInput={
            <SpacedTextField
              label={label}
              error={error}
              ref={ref}
              hideLabel={false}
              placeholder="DD.MM.ÅÅÅÅ"
            />
          }
        />
      )}
    />
  );
};
