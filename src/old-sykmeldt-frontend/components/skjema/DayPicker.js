import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPicker, { DateUtils, LocaleUtils } from "react-day-picker";
import { erGyldigDato, erGyldigDatoformat } from "@/common/utils/datoUtils";
import { fieldPropTypes } from "../../propTypes/fieldproptypes";

export const MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];
export const WEEKDAYS_LONG = [
  "søndag",
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];
export const WEEKDAYS_SHORT = ["søn", "man", "tir", "ons", "tor", "fre", "lør"];

export const formatDay = (date) => {
  // aria-label på dager
  return `${WEEKDAYS_LONG[date.getDay()]} ${date.getDate()}. ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

const localeUtils = Object.assign({}, LocaleUtils, {
  formatDay,
});

const pad = (nr) => {
  return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

export const Caption = ({ date }) => {
  return (
    <div
      className="DayPicker-Caption"
      role="heading"
      aria-live="assertive"
      aria-atomic="true"
    >
      {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
    </div>
  );
};

Caption.propTypes = {
  date: PropTypes.instanceOf(Date),
};

export const NavBar = ({
  onNextClick,
  onPreviousClick,
  showPreviousButton,
  showNextButton,
}) => {
  const className = "DayPicker-NavButton";
  return (
    <div role="toolbar">
      <button
        tabIndex="-1"
        className={`${className} DayPicker-NavButton--prev`}
        disabled={!showPreviousButton}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onPreviousClick();
        }}
      >
        Forrige måned
      </button>
      <button
        tabIndex="-1"
        className={`${className} DayPicker-NavButton--next`}
        disabled={!showNextButton}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onNextClick();
        }}
      >
        Neste måned
      </button>
    </div>
  );
};

NavBar.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  showPreviousButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
};

let lukk;

class DayPickerComponent extends Component {
  componentDidMount() {
    lukk = () => {
      this.props.lukk();
    };
    document.addEventListener("click", lukk);
  }

  componentWillUnmount() {
    document.removeEventListener("click", lukk);
  }

  getDateFromValue() {
    const { input } = this.props;
    const v = input.value;
    if (!erGyldigDatoformat(v) || !erGyldigDato(v)) {
      return undefined;
    }
    const d = input.value.split(".");
    return new Date(`${d[2]}-${d[1]}-${d[0]}`);
  }

  getInitialMonth() {
    const s = this.getDateFromValue();
    if (s) {
      return s < this.props.tidligsteFom ? this.props.tidligsteFom : s;
    }
    return this.props.senesteTom || new Date();
  }

  selectedDays(day) {
    if (!this.getDateFromValue()) {
      return false;
    }
    return DateUtils.isSameDay(this.getDateFromValue(), day);
  }

  erDeaktivertDag(day) {
    const { tidligsteFom, senesteTom } = this.props;
    const _day = new Date(
      `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`
    );
    return _day < tidligsteFom || _day > senesteTom;
  }

  render() {
    const { onKeyUp } = this.props;
    return (
      <div
        className="datovelger__DayPicker"
        role="button"
        tabIndex={0}
        onKeyUp={(e) => {
          onKeyUp(e);
        }}
      >
        <DayPicker
          locale="no"
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          initialMonth={this.getInitialMonth()}
          localeUtils={localeUtils}
          firstDayOfWeek={1}
          captionElement={<Caption />}
          navbarElement={<NavBar />}
          disabledDays={(day) => {
            return this.erDeaktivertDag(day);
          }}
          selectedDays={(day) => {
            return this.selectedDays(day);
          }}
          onDayClick={(jsDato, modifiers, event) => {
            if (!this.erDeaktivertDag(jsDato)) {
              this.props.onDayClick(event, jsDato);
            }
          }}
        />
      </div>
    );
  }
}

DayPickerComponent.propTypes = {
  input: fieldPropTypes.input.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  lukk: PropTypes.func.isRequired,
  onDayClick: PropTypes.func.isRequired,
  senesteTom: PropTypes.instanceOf(Date),
  tidligsteFom: PropTypes.instanceOf(Date),
};

export default DayPickerComponent;
