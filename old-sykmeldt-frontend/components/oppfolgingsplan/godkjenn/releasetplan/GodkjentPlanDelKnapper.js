import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import FadingIconWithText from './FadingIconWithText';
import {Knapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  shareWithNAVError: 'Noe gikk feil da du prøvde å dele planen. Prøv igjen om litt.',
  shareWithFastlegeError: `
        Du får dessverre ikke delt planen med legen herfra.
        Det kan hende fastlegen din ikke kan ta imot elektroniske meldinger. Eller har du kanskje ingen fastlege?
        For å dele planen kan du laste den ned, skrive den ut og ta den med deg neste gang du er hos legen.
    `,
  buttonShareWithNAV: 'Del med NAV',
  sharedWithNAV: 'Planen er delt med NAV',
  buttonShareWithFastlege: 'Del med fastlegen',
  sharedWithFastlege: 'Planen er delt med fastlegen',
};

export const delingFeiletNav = (delmednav) => {
  return delmednav.sendingFeilet;
};

export const delingFeiletFastlege = (fastlegeDeling) => {
  return fastlegeDeling.sendingFeilet;
};

export const hentLedetekstDeltPlanFeilet = (delmednav) => {
  if (delingFeiletNav(delmednav)) {
    return texts.shareWithNAVError;
  }
  return texts.shareWithFastlegeError;
};

export const isGodkjentPlanDelKnapperAvailable = (oppfolgingsplan) => {
  return !(oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedNAV);
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const GodkjentPlanDelKnapper = ({ oppfolgingsplan, delmednav, delMedNavFunc, fastlegeDeling, delMedFastlege }) => {
  const [showFadingIconWithText, setShowFadingIconWithText] = useState(false);

  const prevProp = usePrevious(delmednav.sendt);

  useEffect(() => {
    if (prevProp === false && delmednav.sendt) {
      setShowFadingIconWithText(true);
    }
  }, [delmednav.sendt, prevProp]);

  return (
    <div>
      <div className="buttonColumn">
        {!oppfolgingsplan.godkjentPlan.deltMedNAV && (
          <Knapp
            className="buttonElement"
            mini
            disabled={delmednav.sender}
            spinner={delmednav.sender}
            onClick={() => {
              delMedNavFunc(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonShareWithNAV}
          </Knapp>
        )}
        {showFadingIconWithText && <FadingIconWithText text={texts.sharedWithNAV} />}
        {!oppfolgingsplan.godkjentPlan.deltMedFastlege && (
          <Knapp
            className="buttonElement"
            mini
            disabled={fastlegeDeling.sender}
            spinner={fastlegeDeling.sender}
            onClick={() => {
              delMedFastlege(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonShareWithFastlege}
          </Knapp>
        )}
        {fastlegeDeling.sendt && <FadingIconWithText text={texts.sharedWithFastlege} />}
      </div>

      {(delingFeiletNav(delmednav) || delingFeiletFastlege(fastlegeDeling)) && (
        <Alert className="alertstripe--notifikasjonboks" variant="warning" fullWidth>
          {hentLedetekstDeltPlanFeilet(delmednav)}
        </Alert>
      )}
    </div>
  );
};

GodkjentPlanDelKnapper.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  delmednav: delmednavPt,
  fastlegeDeling: delMedFastlegePt,
  delMedNavFunc: PropTypes.func,
  delMedFastlege: PropTypes.func,
};

export default GodkjentPlanDelKnapper;
