import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { erGyldigDatoIFortiden } from '@/common/utils/datoUtils';
import { STATUS } from '@/common/konstanter';

const texts = {
  buttonEndre: 'Gjør endringer',
  buttonDownload: 'Last ned',
};

export const ButtonDownload = ({ oppfolgingsplan }) => {
  return (
    <div className="godkjentPlanKnapper__knapp godkjentPlanDelKnapper__lastNed">
      <a
        className="lenke"
        href={`${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/dokument/${oppfolgingsplan.id}/ekstern`}
        download="oppfølgingsplan"
      >
        {texts.buttonDownload}
      </a>
    </div>
  );
};
ButtonDownload.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

class GodkjentPlanHandlingKnapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visning: '',
    };
    this.toggleVisning = this.toggleVisning.bind(this);
  }

  toggleVisning(visning) {
    if (this.state.visning === visning) {
      this.setState({
        visning: '',
      });
    } else {
      this.setState({
        visning,
      });
    }
  }

  render() {
    const { oppfolgingsplan, apneBekreftelse } = this.props;
    return (
      <div>
        <ul className="godkjentPlanKnapper">
          {!erGyldigDatoIFortiden(oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom) &&
            oppfolgingsplan.status !== STATUS.AVBRUTT && (
              <li>
                <div className="godkjentPlanKnapper__knapp godkjentPlanKnapper__knapp--endre">
                  <button
                    className="lenke"
                    onClick={() => {
                      apneBekreftelse();
                    }}
                  >
                    {texts.buttonEndre}
                  </button>
                </div>
              </li>
            )}
          <li>
            <ButtonDownload oppfolgingsplan={oppfolgingsplan} />
          </li>
        </ul>
      </div>
    );
  }
}

GodkjentPlanHandlingKnapper.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  apneBekreftelse: PropTypes.func,
};

export default GodkjentPlanHandlingKnapper;
