import React from 'react';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { toDateMedMaanedNavn } from '@/common/utils/datoUtils';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import { MedicalBoxImage, NavLogoImage } from '@/common/images/imageComponents';

const textSharedWithNAV = (date) => {
  return `Planen ble delt med NAV ${date}`;
};

const textSharedWitFastlege = (date) => {
  return `Planen ble delt med fastlegen ${date}`;
};

const GodkjentPlanDeltBekreftelse = ({ oppfolgingsplan }) => {
  return (
    <React.Fragment>
      {oppfolgingsplan.godkjentPlan.deltMedNAV && oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt && (
        <BildeTekstLinje
          imgUrl={NavLogoImage}
          imgAlt=""
          tekst={textSharedWithNAV(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedNAVTidspunkt))}
        />
      )}
      {oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt && (
        <BildeTekstLinje
          imgUrl={MedicalBoxImage}
          imgAlt=""
          tekst={textSharedWitFastlege(toDateMedMaanedNavn(oppfolgingsplan.godkjentPlan.deltMedFastlegeTidspunkt))}
        />
      )}
    </React.Fragment>
  );
};
GodkjentPlanDeltBekreftelse.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

export default GodkjentPlanDeltBekreftelse;
