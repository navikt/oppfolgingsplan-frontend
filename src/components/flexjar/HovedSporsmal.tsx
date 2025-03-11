import { Controller } from "react-hook-form";
import { Radio, RadioGroup } from "@navikt/ds-react";
import React, { ReactElement } from "react";
import { Control } from "react-hook-form/dist/types";
import { FormValues } from "./flexjar";

interface Props {
  sporsmal: string;
  control: Control<FormValues>;
  error: string | undefined;
  disabled?: boolean;
}

export const HovedSporsmal = ({
  sporsmal,
  control,
  error,
  disabled,
}: Props): ReactElement => {
  return (
    <Controller
      name="svar"
      rules={{
        required: "Du må svare på spørsmålet",
      }}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <RadioGroup
          {...field}
          id="feedbackRadioGroup"
          legend={sporsmal}
          hideLegend={false}
          error={error}
          disabled={disabled || false}
        >
          <Radio value="JA">Ja</Radio>
          <Radio value="NEI">Nei</Radio>
          <Radio value="FORBEDRING">Foreslå forbedring</Radio>
        </RadioGroup>
      )}
    />
  );
};
