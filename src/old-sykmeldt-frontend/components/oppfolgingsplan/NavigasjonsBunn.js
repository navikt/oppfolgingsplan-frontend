import React from 'react';
import PropTypes from 'prop-types';
import {Back} from "@navikt/ds-icons";
import getContextRoot from '@/common/utils/getContextRoot';
import {Button, Link} from "@navikt/ds-react";

const tekster = {
    knapp: {
        oversikt: 'Tilbake til oppfølgingsplaner',
        neste: 'Neste',
        tilbake: 'Tilbake',
    },
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        settAktivtSteg(nesteSteg);
    }
};

const NavigasjonsBunn = ({steg, settAktivtSteg, disabled}) => {
    if (disabled) {
        return (
            <Link href={`${getContextRoot()}/oppfolgingsplaner`}>
                <Back/>
                {tekster.knapp.oversikt}
            </Link>
        );
    }
    return (
        <nav className="navigasjonsBunn">
            {steg !== 3 && (
                <Button
                    variant={"primary"}
                    onKeyPress={(e) => {
                        handleKeyPress(settAktivtSteg, steg + 1, e);
                    }}
                    onMouseDown={() => {
                        settAktivtSteg(steg + 1);
                    }}
                >
                    {tekster.knapp.neste}
                </Button>
            )}
            {steg !== 1 && (
                <Button
                    variant={"secondary"}
                    onKeyPress={(e) => {
                        handleKeyPress(settAktivtSteg, steg - 1, e);
                    }}
                    onMouseDown={() => {
                        settAktivtSteg(steg - 1);
                    }}
                >
                    {tekster.knapp.tilbake}
                </Button>
            )}
        </nav>
    );
};
NavigasjonsBunn.propTypes = {
    steg: PropTypes.number,
    settAktivtSteg: PropTypes.func,
    disabled: PropTypes.bool,
};

export default NavigasjonsBunn;
