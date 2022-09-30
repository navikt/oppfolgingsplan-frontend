import React from 'react';
import {Alert, BodyLong, Heading} from "@navikt/ds-react";

interface Props {
    title?: string;
    description?: string;
}

const Feilmelding = ({
                         title = 'Beklager, det oppstod en feil',
                         description = 'Vennligst prøv igjen litt senere.',
                     }: Props) => {
    return (
        <Alert variant="error">
            <div>
                <Heading size={"large"} level={"2"}>{title}</Heading>
                <BodyLong>{description}</BodyLong>
            </div>
        </Alert>
    )
};

export default Feilmelding;
