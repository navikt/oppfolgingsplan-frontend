import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import {Knapp} from "@/common/old-designsystem/nav-frontend-knapper";

export const tekster = {
  tittel: 'Hva kan gjøre det lettere å jobbe?',
  knapp: '+ Legg til nytt tiltak',
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TiltakInfoboks = ({ toggleSkjema, visTiltakSkjema }) => {
  const classNames = cn({
    sist: visTiltakSkjema,
    blokk: !visTiltakSkjema,
  });
  return (
    <Panel className="tiltakInfoboks" border>
      <h3 className={classNames}>{tekster.tittel}</h3>
      {!visTiltakSkjema && (
        <Wrapper>
          <Knapp mini htmlType="submit" aria-pressed={visTiltakSkjema} onClick={toggleSkjema}>
            {tekster.knapp}
          </Knapp>
        </Wrapper>
      )}
    </Panel>
  );
};

TiltakInfoboks.propTypes = {
  visTiltakSkjema: PropTypes.bool,
  toggleSkjema: PropTypes.func,
};

export default TiltakInfoboks;
