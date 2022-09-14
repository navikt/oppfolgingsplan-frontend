import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { hentGodkjenningsTidspunkt } from '@/common/utils/oppfolgingsdialogUtils';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { PlanMottattIgjenImage } from '@/common/images/imageComponents';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  godkjennPlanMottattKnapper: {
    buttonApprove: 'Godkjenn',
  },
  godkjennPlanAvslaattOgGodkjent: {
    title: 'Mottatt endring',
    paragraphInfoWho: ' har gjort noen endringer i planen og sendt den tilbake til deg.',
  },
  delMedNav: 'Del planen med NAV',
  preDelMedNav: 'Planen vil bli delt med NAV når du har godkjent den.',
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsplan }) => {
  const [delMedNav, setDelMedNav] = useState(false);

  const handleChange = () => {
    setDelMedNav(!delMedNav);
  };

  return (
    <div>
      <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsplan} />
      <div className="knapperad knapperad__element knapperad--justervenstre">
        <Hovedknapp
          name="godkjentKnapp"
          id="godkjentKnapp"
          autoFocus
          onClick={() => {
            godkjennPlan(oppfolgingsplan.id, null, true, delMedNav);
          }}
        >
          {texts.godkjennPlanMottattKnapper.buttonApprove}
        </Hovedknapp>
      </div>
    </div>
  );
};
GodkjennPlanMottattKnapper.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  godkjennPlan: PropTypes.func,
};

const GodkjennPlanAvslaattOgGodkjent = ({ oppfolgingsplan, godkjennPlan, avvisDialog }) => {
  const sistOppfolgingsplan = oppfolgingsplan && hentGodkjenningsTidspunkt(oppfolgingsplan);
  return (
    <div className="godkjennPlanAvslaattOgGodkjent">
      <OppfolgingsplanInnholdboks
        svgUrl={PlanMottattIgjenImage}
        svgAlt=""
        tittel={texts.godkjennPlanAvslaattOgGodkjent.title}
      >
        <div>
          <p>
            {`${oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}${texts.godkjennPlanAvslaattOgGodkjent.paragraphInfoWho}`}
          </p>

          <GodkjennPlanTidspunkt gyldighetstidspunkt={sistOppfolgingsplan} />
          <PlanEkspanderbar oppfolgingsplan={oppfolgingsplan} />
          <EditButton oppfolgingsdialog={oppfolgingsplan} avvisDialog={avvisDialog} />
          <GodkjennPlanMottattKnapper
            oppfolgingsplan={oppfolgingsplan}
            godkjennPlan={godkjennPlan}
            avvisDialog={avvisDialog}
          />
        </div>
      </OppfolgingsplanInnholdboks>
    </div>
  );
};

GodkjennPlanAvslaattOgGodkjent.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  godkjennPlan: PropTypes.func,
  avvisDialog: PropTypes.func,
};

export default GodkjennPlanAvslaattOgGodkjent;
