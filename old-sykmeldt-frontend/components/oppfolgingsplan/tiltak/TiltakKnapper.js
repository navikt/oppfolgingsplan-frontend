import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tiltakPt, tiltakReducerPt } from '../../../propTypes/opproptypes';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  buttonAbort: 'Avbryt',
  buttonCreate: 'Lagre tiltak',
  buttonUpdate: 'Lagre tiltak',
};

const handleKeyPress = (avbryt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    avbryt();
  }
};

class TiltakKnapper extends Component {
  constructor() {
    super();
    this.state = {
      spinner: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (nextProps.tiltakReducer &&
        nextProps.tiltakReducer.lagrer &&
        !nextProps.tiltakReducer.tiltakId &&
        !this.props.tiltak) ||
      (this.props.tiltak &&
        nextProps.tiltakReducer.tiltakId > 0 &&
        nextProps.tiltakReducer.tiltakId === this.props.tiltak.tiltakId)
    ) {
      this.setState({
        spinner: nextProps.tiltakReducer.lagrer,
      });
    } else {
      this.setState({
        spinner: false,
      });
    }
  }

  render() {
    const { avbryt, tiltak } = this.props;
    const submitButtonText = tiltak ? texts.buttonUpdate : texts.buttonCreate;
    return (
      <div className="knapperad knapperad--justervenstre">
        <div className="knapperad__element">
          <Hovedknapp mini disabled={this.state.spinner} spinner={this.state.spinner} htmlType="submit">
            {submitButtonText}
          </Hovedknapp>
        </div>
        <div className="knapperad__element">
          <button
            type="button"
            className="lenke"
            onKeyPress={(e) => {
              handleKeyPress(avbryt, e);
            }}
            onMouseDown={avbryt}
          >
            {texts.buttonAbort}
          </button>
        </div>
      </div>
    );
  }
}
TiltakKnapper.propTypes = {
  avbryt: PropTypes.func,
  tiltak: tiltakPt,
  tiltakReducer: tiltakReducerPt,
};

export default TiltakKnapper;
