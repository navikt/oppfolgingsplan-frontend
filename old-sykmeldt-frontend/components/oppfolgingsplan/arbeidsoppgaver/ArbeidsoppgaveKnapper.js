import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arbeidsoppgavePt, arbeidsoppgaverReducerPt } from '../../../propTypes/opproptypes';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  buttonAbort: 'Avbryt',
  buttonCreate: 'Lagre arbeidsoppgave',
  buttonUpdate: 'Lagre',
};

const handleKeyPress = (avbryt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    avbryt();
  }
};

class ArbeidsoppgaveKnapper extends Component {
  constructor() {
    super();
    this.state = {
      spinner: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (nextProps.arbeidsoppgaverReducer &&
        nextProps.arbeidsoppgaverReducer.lagrer &&
        !nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId &&
        !this.props.arbeidsoppgave) ||
      (this.props.arbeidsoppgave &&
        nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId > 0 &&
        nextProps.arbeidsoppgaverReducer.arbeidsoppgaveId === this.props.arbeidsoppgave.arbeidsoppgaveId)
    ) {
      this.setState({
        spinner: nextProps.arbeidsoppgaverReducer.lagrer,
      });
    } else {
      this.setState({
        spinner: false,
      });
    }
  }

  render() {
    const { arbeidsoppgave, avbryt } = this.props;
    const submitButtonText = arbeidsoppgave ? texts.buttonUpdate : texts.buttonCreate;
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

ArbeidsoppgaveKnapper.propTypes = {
  arbeidsoppgave: arbeidsoppgavePt,
  avbryt: PropTypes.func,
  arbeidsoppgaverReducer: arbeidsoppgaverReducerPt,
};

export default ArbeidsoppgaveKnapper;
