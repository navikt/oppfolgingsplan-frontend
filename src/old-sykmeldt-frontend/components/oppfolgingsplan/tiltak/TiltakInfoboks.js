import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styled from 'styled-components';
import {Button, Panel} from "@navikt/ds-react";

export const tekster = {
    tittel: 'Hva kan gjøre det lettere å jobbe?',
    knapp: '+ Legg til nytt tiltak',
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TiltakInfoboks = ({toggleSkjema, visTiltakSkjema}) => {
    const classNames = cn({
        sist: visTiltakSkjema,
        blokk: !visTiltakSkjema,
    });
    return (
        <Panel className="tiltakInfoboks" border={true}>
            <h3 className={classNames}>{tekster.tittel}</h3>
            {!visTiltakSkjema && (
                <Wrapper>
                    <Button variant={"secondary"} size={"small"} aria-pressed={visTiltakSkjema} onClick={toggleSkjema}>
                        {tekster.knapp}
                    </Button>
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
