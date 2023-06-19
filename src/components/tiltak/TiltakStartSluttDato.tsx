import Datepicker from "../blocks/datepicker/Datepicker";
import { toDate } from "../../utils/dateUtils";
import React from "react";
import {
  TILTAK_SLUTTDATO,
  TILTAK_STARTDATO,
} from "../../../cypress/dataTestId";

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
    <div className="flex flex-row gap-8 mb-8">
      <Datepicker
        testid={TILTAK_STARTDATO}
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
        testid={TILTAK_SLUTTDATO}
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
    </div>
  );
};
