import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import GodkjennPlanAvslaatt from './GodkjennPlanAvslaatt';
import GodkjennPlanAvslaattOgGodkjent from './GodkjennPlanAvslaattOgGodkjent';
import GodkjennPlanMottatt from './GodkjennPlanMottatt';

const harMangeGodkjenninger = (godkjenninger) => {
  return godkjenninger.length > 1;
};

const MottattGodkjenninger = ({
  oppfolgingsplan,
  godkjennPlan,
  nullstillGodkjenning,
  avvisDialog,
  rootUrl,
  rootUrlPlaner,
}) => {
  if (harMangeGodkjenninger(oppfolgingsplan.godkjenninger)) {
    return (
      <GodkjennPlanAvslaattOgGodkjent
        avvisDialog={avvisDialog}
        godkjennPlan={godkjennPlan}
        oppfolgingsplan={oppfolgingsplan}
        rootUrl={rootUrl}
      />
    );
  }

  const godkjenning = oppfolgingsplan.godkjenninger[0];
  if (godkjenning.godkjent) {
    return (
      <GodkjennPlanMottatt
        avvisDialog={avvisDialog}
        godkjennPlan={godkjennPlan}
        oppfolgingsdialog={oppfolgingsplan}
        rootUrlPlaner={rootUrlPlaner}
      />
    );
  }
  return <GodkjennPlanAvslaatt nullstillGodkjenning={nullstillGodkjenning} oppfolgingsplan={oppfolgingsplan} />;
};

MottattGodkjenninger.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  godkjennPlan: PropTypes.func,
  nullstillGodkjenning: PropTypes.func,
  avvisDialog: PropTypes.func,
  rootUrl: PropTypes.string,
  rootUrlPlaner: PropTypes.string,
};

export default MottattGodkjenninger;
