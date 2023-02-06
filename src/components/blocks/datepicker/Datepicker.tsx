import React, { ReactNode } from "react";
import { useController, Validate } from "react-hook-form";
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { leggTilDagerPaDato, toDate } from "../../../utils/dateUtils";

export interface Props {
  name: string;
  label?: string | ReactNode;
  defaultValue?: Date | null;
  // eslint-disable-next-line
  validate?: Validate<any> | Record<string, Validate<any>>;
}

const Datepicker = ({ name, label, defaultValue, validate }: Props) => {
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
    <div>
      <div className="pt-4">{field.value && field.value.toString()}</div>
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input
          id={field.name}
          {...inputProps}
          label={label}
          placeholder="DD.MM.ÅÅÅÅ"
          error={fieldState.error?.message}
        />
      </UNSAFE_DatePicker>
    </div>
  );
};

export default Datepicker;
