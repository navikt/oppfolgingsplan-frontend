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
  defaultValue?: Date | null;
  error?: string;
  errorMessage: string;
}

const SpacedTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: 12rem;
`;

export const DatoVelger = ({ label, name, defaultValue, error, errorMessage }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ required: errorMessage }}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, name, value, ref } }) => (
        <ReactDatePicker
          id={name}
          locale="nb"
          dateFormat="dd.MM.yyyy"
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
              hideLabel={false}
              placeholder="DD.MM.ÅÅÅÅ"
            />
          }
          autoFocus={false}
        />
      )}
    />
  );
};
