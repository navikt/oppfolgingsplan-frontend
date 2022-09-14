import React from 'react';
import PropTypes from 'prop-types';
import * as opProptypes from '../../propTypes/opproptypes';
import {
  finnOppfolgingsdialogMotpartNavn,
  inneholderGodkjenninger,
  inneholderGodkjenningerAvArbeidstaker,
} from '@/common/utils/oppfolgingsdialogUtils';
import { hentPlanStatus } from '@/common/utils/teaserUtils';
import {Tag} from "@navikt/ds-react";
import {LenkepanelBase} from "@/common/old-designsystem/nav-frontend-lenkepanel";

const texts = {
  etiketter: {
    tilGodkjenning: 'Til godkjenning',
  },
};

export const TilGodkjenningStatus = ({ oppfolgingsplan }) => {
  return (
    inneholderGodkjenninger(oppfolgingsplan) &&
    !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan) && (
      <Tag variant={"warning"} size={"small"}>{texts.etiketter.tilGodkjenning}</Tag>
    )
  );
};
TilGodkjenningStatus.propTypes = {
  oppfolgingsplan: opProptypes.oppfolgingsplanPt,
};

const OppfolgingsdialogTeaser = ({ oppfolgingsdialog, rootUrlPlaner }) => {
  const planStatus = hentPlanStatus(oppfolgingsdialog);
  return (
    <LenkepanelBase href={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsdialog.id}`} border>
      <div className="inngangspanel">
        <span className="oppfolgingsplanInnhold__ikon">
          <img alt="" src={planStatus.img} />
        </span>
        <div className="inngangspanel__innhold">
          <header className="inngangspanel__header">
            <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
              <span className="inngangspanel__tittel">{finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}</span>
            </h3>
          </header>
          {typeof planStatus.tekst === 'object' ? (
            <p className="inngangspanel__tekst" dangerouslySetInnerHTML={planStatus.tekst} />
          ) : (
            <p className="inngangspanel__tekst" dangerouslySetInnerHTML={{ __html: planStatus.tekst }} />
          )}
          <TilGodkjenningStatus oppfolgingsplan={oppfolgingsdialog} />
        </div>
      </div>
    </LenkepanelBase>
  );
};

OppfolgingsdialogTeaser.propTypes = {
  oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTeaser;
