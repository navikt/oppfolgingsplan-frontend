import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { finnNyesteGodkjenning } from '@/common/utils/oppfolgingsdialogUtils';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanVenterInfo from '../godkjenn/GodkjennPlanVenterInfo';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { HakeGronnLysImage } from '@/common/images/imageComponents';

const texts = {
  godkjennPlanSendt: {
    title: 'Sendt til godkjenning',
    buttonUndo: 'Avbryt planen',
  },
};

const GodkjenPlanSentBlokk = (narmestelederName) => {
  const text = 'Du har sendt en ny versjon av oppfølgingsplanen til din arbeidsgiver ';
  return (
    <div className="blokk">
      <p>
        {text}
        <b>{narmestelederName}</b>
      </p>
    </div>
  );
};

const GodkjennPlanSendt = ({ oppfolgingsdialog, nullstillGodkjenning, rootUrlPlaner }) => {
  return (
    <OppfolgingsplanInnholdboks svgUrl={HakeGronnLysImage} liteikon svgAlt="" tittel={texts.godkjennPlanSendt.title}>
      <div className="godkjennPlanSendt">
        {GodkjenPlanSentBlokk(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}

        <GodkjennPlanTidspunkt
          gyldighetstidspunkt={finnNyesteGodkjenning(oppfolgingsdialog.godkjenninger).gyldighetstidspunkt}
        />

        <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />
        <button
          className="lenke lenke--avbryt"
          onClick={() => {
            nullstillGodkjenning(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
          }}
        >
          {texts.godkjennPlanSendt.buttonUndo}
        </button>
        <GodkjennPlanVenterInfo />
        <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsdialog} rootUrlPlaner={rootUrlPlaner} />
      </div>
    </OppfolgingsplanInnholdboks>
  );
};
GodkjennPlanSendt.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  nullstillGodkjenning: PropTypes.func,
  rootUrlPlaner: PropTypes.string,
};

export default GodkjennPlanSendt;
