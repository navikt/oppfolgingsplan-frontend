import React, {forwardRef, useRef} from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from 'date-fns/locale/nb';
import {TextField} from "@navikt/ds-react";
import styled from "styled-components";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {FormValues} from "@/common/components/tiltak/TiltakForm";

registerLocale('nb', nb);

interface Props {
    onChange(newDate: Date | null): void;

    label: string;

    field: ControllerRenderProps<FormValues, any>;
}

const SpacedTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: 12rem;
`

const CustomDateInput = forwardRef((props: any, ref: any) => (
    <SpacedTextField
        ref={ref}
        hideLabel={false}
        placeholder="DD.MM.ÅÅÅÅ"
        {...props}
    />
));

export const DatoVelger = ({onChange, label, field}: Props) => {
    const refCustomInput = useRef();

    return (
        <DatePicker
            locale="nb"
            dateFormat="dd.MM.yyyy"
            selected={field.value}
            customInput={<CustomDateInput {...field} ref={refCustomInput} label={label}/>}
            onChange={onChange}
        />
    );
}

