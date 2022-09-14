import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { OppfolgingsplanAvslattImage } from '@/common/images/imageComponents';
import {Button} from "@navikt/ds-react";

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
          <Button variant={"primary"}
            onClick={() => {
              nullstillGodkjenning(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonMakeChanges}
          </Button>
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
