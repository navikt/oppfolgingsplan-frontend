import {BodyLong, Heading} from "@navikt/ds-react";
import {ReactElement} from "react";

export const TiltakFormHeading = (): ReactElement => {
    return <>
        <Heading spacing size="medium" level="3">Hva kan gjøre det lettere å jobbe?</Heading>
        <BodyLong spacing size="medium">Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva
            slags tilrettelegging det er mulig å tilby.</BodyLong>
    </>
}