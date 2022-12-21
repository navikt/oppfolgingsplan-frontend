import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from "date-fns/locale/nb";
import { TextField } from "@navikt/ds-react";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import { FieldPathValue } from "react-hook-form/dist/types/path";
import { Validate } from "react-hook-form/dist/types/validator";
import { leggTilDagerPaDato } from "../../../utils/dateUtils";

registerLocale("nb", nb);

interface Props {
  name: string;
  label: string;
  defaultValue?: Date | null;
  errorMessageToDisplay?: string;
  requiredErrorMessage: string;
  validate?:
    | Validate<FieldPathValue<any, any>>
    | Record<string, Validate<FieldPathValue<any, any>>>;
}

const SpacedTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: 12rem;
`;

export const DatoVelger = ({
  label,
  name,
  defaultValue,
  errorMessageToDisplay,
  requiredErrorMessage,
  validate,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{ required: requiredErrorMessage, validate: validate }}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, name, value, ref } }) => (
        <ReactDatePicker
          id={name}
          locale="nb"
          dateFormat="dd.MM.yyyy"
          maxDate={leggTilDagerPaDato(new Date(), 365 * 5)}
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
              error={errorMessageToDisplay}
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
