import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { tiltakPt } from '../../../../propTypes/opproptypes';
import ButtonEditIcon from '../../../app/buttons/ButtonEditIcon';
import ButtonDeleteIcon from '../../../app/buttons/ButtonDeleteIcon';
import ButtonComment from '../../../app/buttons/ButtonComment';
import MiniSpinner from '../../../MiniSpinner';

const TiltakButtonsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  padding-top: 1em;
`;

const TiltakInformasjonKnapper = ({
  element,
  fnr,
  lagreSkjema,
  visLagreSkjema,
  sendSlett,
  lagreKommentarSkjema,
  visLagreKommentarSkjema,
}) => {
  const [sletter, setSletter] = useState(false);
  const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
  return (
    <TiltakButtonsRow>
      <div>
        {!lagreSkjema && aktoerHarOpprettetElement && (
          <ButtonEditIcon
            click={(event) => {
              visLagreSkjema(event);
            }}
          />
        )}
      </div>
      <div>
        {aktoerHarOpprettetElement && (
          <div>
            {sletter ? (
              <MiniSpinner />
            ) : (
              <ButtonDeleteIcon
                click={(event) => {
                  setSletter(true);
                  sendSlett(event, element.tiltakId);
                }}
              />
            )}
          </div>
        )}
      </div>
      <div>
        {!lagreKommentarSkjema && (
          <ButtonComment
            count={element.kommentarer.length}
            click={(event) => {
              visLagreKommentarSkjema(event);
            }}
          />
        )}
      </div>
    </TiltakButtonsRow>
  );
};
TiltakInformasjonKnapper.propTypes = {
  element: tiltakPt,
  fnr: PropTypes.string,
  lagreSkjema: PropTypes.bool,
  visLagreSkjema: PropTypes.func,
  sendSlett: PropTypes.func,
  lagreKommentarSkjema: PropTypes.bool,
  visLagreKommentarSkjema: PropTypes.func,
};

export default TiltakInformasjonKnapper;
