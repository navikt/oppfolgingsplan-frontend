import React, { ReactNode } from "react";
import { useController, Validate } from "react-hook-form";
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { leggTilDagerPaDato, toDate } from "../../../utils/dateUtils";

export interface Props {
  testid: string;
  name: string;
  label?: string | ReactNode;
  defaultValue?: Date | null;
  validate?: Validate<Date> | Record<string, Validate<Date>>;
}

const Datepicker = ({ testid, name, label, defaultValue, validate }: Props) => {
  const { field, fieldState } = useController({
    name: name,
    defaultValue: defaultValue,
    rules: {
      validate: validate,
    },
  });

  const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
    defaultSelected: field.value ? toDate(field.value) : undefined,
    toDate: leggTilDagerPaDato(new Date(), 365 * 5),
    onDateChange: (date: Date | undefined) => {
      field.onChange(date);
    },
  });

  return (
    <UNSAFE_DatePicker {...datepickerProps}>
      <UNSAFE_DatePicker.Input
        id={field.name}
        data-testid={testid}
        {...inputProps}
        label={label}
        placeholder="DD.MM.ÅÅÅÅ"
        error={fieldState.error?.message}
      />
    </UNSAFE_DatePicker>
  );
};

export default Datepicker;
