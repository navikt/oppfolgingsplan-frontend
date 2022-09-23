import React, {forwardRef, useRef, useState} from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from 'date-fns/locale/nb';
import {TextField} from "@navikt/ds-react";
import styled from "styled-components";


registerLocale('nb', nb);

interface Props {
    label: string
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

export const DatoVelger = ({label}: Props) => {
    const [startDate, setStartDate] = useState<Date | null>();
    const refCustomInput = useRef();

    return (
        <DatePicker
            locale="nb"
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            customInput={<CustomDateInput ref={refCustomInput} label={label}/>}
            onChange={(newDate) => setStartDate(newDate)}
        />
    );
}

