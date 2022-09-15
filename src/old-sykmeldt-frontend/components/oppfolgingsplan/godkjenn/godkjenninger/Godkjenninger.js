import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '@/propTypes/opproptypes';
import getContextRoot from '@/common/utils/getContextRoot';
import MottattGodkjenninger from './MottattGodkjenninger';
import GodkjennPlanSendt from './GodkjennPlanSendt';

const harMottattGodkjenninger = (oppfolgingsdialog) => {
  const godkjenninger = oppfolgingsdialog.godkjenninger;
  const aktoer = oppfolgingsdialog.arbeidstaker;
  return godkjenninger.length > 0 && godkjenninger[0].godkjentAv.fnr && godkjenninger[0].godkjentAv.fnr !== aktoer.fnr;
};

const Godkjenninger = ({ oppfolgingsdialog, godkjennPlan, nullstillGodkjenning, avvisDialog, rootUrlPlaner }) => {
  window.location.hash = 'godkjenn';
  window.sessionStorage.setItem('hash', 'godkjenn');

  if (harMottattGodkjenninger(oppfolgingsdialog)) {
    return (
      <MottattGodkjenninger
        oppfolgingsplan={oppfolgingsdialog}
        godkjennPlan={godkjennPlan}
        nullstillGodkjenning={nullstillGodkjenning}
        avvisDialog={avvisDialog}
        rootUrl={getContextRoot()}
        rootUrlPlaner={rootUrlPlaner}
      />
    );
  }
  return (
    <GodkjennPlanSendt
      oppfolgingsdialog={oppfolgingsdialog}
      nullstillGodkjenning={nullstillGodkjenning}
      rootUrlPlaner={rootUrlPlaner}
    />
  );
};

Godkjenninger.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  avvisDialog: PropTypes.func,
  nullstillGodkjenning: PropTypes.func,
  godkjennPlan: PropTypes.func,
  rootUrlPlaner: PropTypes.string,
};

export default Godkjenninger;
