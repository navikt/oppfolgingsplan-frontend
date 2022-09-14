import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, GuidePanel} from "@navikt/ds-react";
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { erArbeidstakerEgenLeder, erIkkeOppfolgingsdialogUtfylt } from '@/common/utils/oppfolgingsdialogUtils';
import IkkeUtfyltPlanFeilmelding from './IkkeUtfyltPlanFeilmelding';
import VeilederAvatar from '../../../app/VeilederAvatar';

const texts = {
  veileder: 'Er du ferdig med denne planen og ønsker å sende den til arbeidsgiveren din for godkjenning?',
  buttonGodkjenn: 'Jeg er ferdig',
  arbeidstakerLeaderSamePerson: {
    info: 'Fordi du er din egen leder, må du logge inn som arbeidsgiver for å fullføre planen.',
  },
};

export const ReviderEllerGodkjennPlanKnapperad = ({ godkjennPlan }) => {
  return (
    <div className="knapperad">
      <div className="knapperad__element">
        <Button variant="primary" size="small" onClick={godkjennPlan}>
          {texts.buttonGodkjenn}
        </Button>
      </div>
    </div>
  );
};
ReviderEllerGodkjennPlanKnapperad.propTypes = {
  godkjennPlan: PropTypes.func,
};

class ReviderEllerGodkjennPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visIkkeUtfyltFeilmelding: false,
    };
    this.godkjennPlan = this.godkjennPlan.bind(this);
  }

  godkjennPlan() {
    if (erIkkeOppfolgingsdialogUtfylt(this.props.oppfolgingsdialog)) {
      this.setState({
        visIkkeUtfyltFeilmelding: true,
      });
    } else {
      this.props.visSendTilGodkjenning();
    }
  }

  render() {
    const { oppfolgingsdialog, settAktivtSteg } = this.props;
    const visEgenLederVisning = erArbeidstakerEgenLeder(oppfolgingsdialog);
    return (
      <div className="godkjennPlanOversiktInformasjon">
        <div className="panel godkjennPlanOversiktInformasjon__panel">
          {visEgenLederVisning ? (
            <Alert className="alertstripe--notifikasjonboks" variant={"info"}>
              {texts.arbeidstakerLeaderSamePerson.info}
            </Alert>
          ) : (
            <React.Fragment>
              <GuidePanel illustration={<VeilederAvatar />}>{texts.veileder}</GuidePanel>
              {this.state.visIkkeUtfyltFeilmelding && (
                <IkkeUtfyltPlanFeilmelding oppfolgingsdialog={oppfolgingsdialog} settAktivtSteg={settAktivtSteg} />
              )}
              <ReviderEllerGodkjennPlanKnapperad godkjennPlan={this.godkjennPlan} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

ReviderEllerGodkjennPlan.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  settAktivtSteg: PropTypes.func,
  visSendTilGodkjenning: PropTypes.func,
};

export default ReviderEllerGodkjennPlan;
