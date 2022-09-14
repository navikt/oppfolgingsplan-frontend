import React from 'react';
import PropTypes from 'prop-types';
import { textBothApprovedOppfolgingsplan } from '@/common/utils/textUtils';
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from '@/common/utils/oppfolgingsdialogUtils';
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import GodkjentPlanAvbruttTidspunkt from './GodkjentPlanAvbruttTidspunkt';
import { ButtonDownload } from './GodkjentPlanHandlingKnapper';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import TextForcedApprovedOppfolgingsplan from './TextForcedApprovedOppfolgingsplan';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { PlanAvbruttImage } from '@/common/images/imageComponents';
import {Panel} from "@navikt/ds-react";

const texts = {
  linkActivePlan: 'Tilbake til den gjeldende utgave',
  title: 'Tidligere oppfølgingsplan',
  tvungenGodkjenning: 'Planen er laget av arbeidsgiveren din.',
};

const GodkjentPlanAvbrutt = ({
  oppfolgingsdialog,
  oppfolgingsdialoger,
  delmednav,
  delMedNavFunc,
  fastlegeDeling,
  delMedFastlege,
  rootUrlPlaner,
}) => {
  const aktivPlan = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
    oppfolgingsdialoger,
    oppfolgingsdialog.virksomhet.virksomhetsnummer
  );
  const godkjentPlan = oppfolgingsdialog.godkjentPlan;

  return (
    <Panel border={true} className="godkjentPlanAvbrutt">
      <div className="godkjentPlanAvbrutt_lenke">
        {aktivPlan && (
          <a className="lenke" href={`${rootUrlPlaner}/oppfolgingsplaner/${aktivPlan.id}`}>
            {texts.linkActivePlan}
          </a>
        )}
      </div>
      <OppfolgingsplanInnholdboks svgUrl={PlanAvbruttImage} svgAlt="" tittel={texts.title}>
        <div className="godkjentPlanAvbrutt">
          {!godkjentPlan.tvungenGodkjenning && (
            <p>{textBothApprovedOppfolgingsplan(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}</p>
          )}
          {godkjentPlan.tvungenGodkjenning && <TextForcedApprovedOppfolgingsplan text={texts.tvungenGodkjenning} />}

          <GodkjentPlanAvbruttTidspunkt oppfolgingsplan={oppfolgingsdialog} />
          <GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsdialog} />
          <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />
          {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && (
            <GodkjentPlanDelKnapper
              className="godkjentPlanAvbruttDelKnapper"
              oppfolgingsplan={oppfolgingsdialog}
              delmednav={delmednav}
              delMedNavFunc={delMedNavFunc}
              fastlegeDeling={fastlegeDeling}
              delMedFastlege={delMedFastlege}
            />
          )}
          <div className="knapperad knapperad--justervenstre">
            <ButtonDownload oppfolgingsplan={oppfolgingsdialog} />
          </div>
        </div>
      </OppfolgingsplanInnholdboks>
    </Panel>
  );
};

GodkjentPlanAvbrutt.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  delmednav: delmednavPt,
  delMedNavFunc: PropTypes.func,
  fastlegeDeling: delMedFastlegePt,
  delMedFastlege: PropTypes.func,
  rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanAvbrutt;
