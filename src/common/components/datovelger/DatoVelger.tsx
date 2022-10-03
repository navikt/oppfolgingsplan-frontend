import React, {forwardRef, useRef} from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from 'date-fns/locale/nb';
import {TextField} from "@navikt/ds-react";
import styled from "styled-components";


registerLocale('nb', nb);

interface Props {
    selectedDate: Date | null;

    onChange(newDate: Date | null): void;

    label: string;
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

export const DatoVelger = ({selectedDate, onChange, label}: Props) => {
    const refCustomInput = useRef();

    return (
        <DatePicker
            locale="nb"
            dateFormat="dd.MM.yyyy"
            selected={selectedDate}
            customInput={<CustomDateInput ref={refCustomInput} label={label}/>}
            onChange={(newDate) => onChange(newDate)}
        />
    );
}

