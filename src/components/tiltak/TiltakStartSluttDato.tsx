import Datepicker from "../blocks/datepicker/Datepicker";
import { toDate } from "../../utils/dateUtils";
import React from "react";
import styled from "styled-components";

const DateRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  margin-bottom: 2rem;
`;

interface Props {
  defaultValueFom?: Date | null;
  defaultValueTom?: Date | null;
  startDate: Date | null;
}

export const TiltakStartSluttDato = ({
  defaultValueFom,
  defaultValueTom,
  startDate,
}: Props) => {
  return (
    <DateRow>
      <Datepicker
        name="fom"
        label="Startdato (obligatorisk)"
        defaultValue={defaultValueFom}
        validate={(value: Date | undefined) => {
          if (!value) {
            return "Du må velge startdato";
          }
        }}
      />

      <Datepicker
        name="tom"
        label={"Sluttdato (obligatorisk)"}
        defaultValue={defaultValueTom}
        validate={(value: Date | undefined) => {
          if (!value) {
            return "Du må velge sluttdato";
          }

          if (startDate && value.getTime() < toDate(startDate).getTime()) {
            return "Sluttdato må være etter startdato";
          }
        }}
      />
    </DateRow>
  );
};
