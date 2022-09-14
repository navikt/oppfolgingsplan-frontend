import React from 'react';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import { finnOppfolgingsdialogMotpartNavn } from '@/common/utils/oppfolgingsdialogUtils';
import { hentStatusUtenAktivSykmelding } from '@/common/utils/teaserUtils';
import getContextRoot from '@/common/utils/getContextRoot';
import {LenkepanelBase} from "@/common/old-designsystem/nav-frontend-lenkepanel";

const OppfolgingsdialogTidligereUtenSykmelding = ({ oppfolgingsdialog }) => {
  const planStatus = hentStatusUtenAktivSykmelding(oppfolgingsdialog);
  return (
    <LenkepanelBase href={`${getContextRoot()}/oppfolgingsplaner/${oppfolgingsdialog.id}`} border>
      <div className="inngangspanel">
        <span className="oppfolgingsplanInnhold__ikon">
          <img alt="" src={`${getContextRoot()}/img/svg/${planStatus.img}`} />
        </span>
        <div className="inngangspanel__innhold">
          <header className="inngangspanel__header">
            <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
              <span className="inngangspanel__tittel">{finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}</span>
            </h3>
          </header>
          <p className="mute inngangspanel__avsnitt" dangerouslySetInnerHTML={{ __html: planStatus.tekst }} />
        </div>
      </div>
    </LenkepanelBase>
  );
};

OppfolgingsdialogTidligereUtenSykmelding.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
};

export default OppfolgingsdialogTidligereUtenSykmelding;
