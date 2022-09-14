import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import PlanEkspanderbar from '../PlanEkspanderbar';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { VarseltrekantImage } from '@/common/images/imageComponents';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  title: 'Lederen din har laget en oppfølgingsplan',
  paragraphInfo: 'Hvis du er uenig i innholdet, må du snakke med lederen din.',
  buttonConfirm: 'Videre',
};

const ArbeidsgiverHarTvangsgodkjent = ({ oppfolgingsdialog, markerMottattTvungenGodkjenning }) => {
  return (
    <OppfolgingsplanInnholdboks liteikon svgUrl={VarseltrekantImage} svgAlt="" tittel={texts.title}>
      <div className="arbeidsgiverHarTvangsgodkjent">
        <p>{texts.paragraphInfo}</p>
        <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />

        <div className="knapperad">
          <div className="knapperad__element">
            <Hovedknapp onClick={markerMottattTvungenGodkjenning}>{texts.buttonConfirm}</Hovedknapp>
          </div>
        </div>
      </div>
    </OppfolgingsplanInnholdboks>
  );
};

ArbeidsgiverHarTvangsgodkjent.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  markerMottattTvungenGodkjenning: PropTypes.func,
};

export default ArbeidsgiverHarTvangsgodkjent;
