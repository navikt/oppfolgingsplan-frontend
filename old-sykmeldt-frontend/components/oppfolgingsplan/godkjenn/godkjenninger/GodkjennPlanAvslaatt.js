import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { OppfolgingsplanAvslattImage } from '@/common/images/imageComponents';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  title: 'Lederen din har noen forslag',
  paragraphInfo: 'Du kan gjøre endringer slik at dere får en god plan.',
  buttonMakeChanges: 'Rediger planen',
};

const GodkjennPlanAvslaatt = ({ oppfolgingsplan, nullstillGodkjenning }) => {
  return (
    <OppfolgingsplanInnholdboks svgUrl={OppfolgingsplanAvslattImage} svgAlt="" tittel={texts.title}>
      <div className="godkjennPlanAvslaatt">
        <div className="godkjennPlanAvslaatt__infoboks">
          <p>{texts.paragraphInfo}</p>
        </div>
        <div className="knapperad">
          <Hovedknapp
            onClick={() => {
              nullstillGodkjenning(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonMakeChanges}
          </Hovedknapp>
        </div>
      </div>
    </OppfolgingsplanInnholdboks>
  );
};
GodkjennPlanAvslaatt.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  nullstillGodkjenning: PropTypes.func,
};

export default GodkjennPlanAvslaatt;
