import React from 'react';
import {Ingress, Link} from "@navikt/ds-react";
import styled from "styled-components";

const texts = {
    paragraphInfo: `
        Oppfølgingsplanen skal gjøre det lettere for deg å bli i jobben. Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de på arbeidsplassen din som har tilgang.
    `,
    readMore: {
        title: 'Les mer om:',
        linkLover: 'Hvilke lover som gjelder for oppfølgingsplanen',
        linkPersonvern: 'Hvordan NAV behandler personopplysninger',
    },
};

const IngressMarginTop = styled(Ingress)`
  margin-top: 1rem;
`;

const OppfolgingsdialogerInfoPersonvern = () => {
    return (
        <div>
            <Ingress>{texts.paragraphInfo}</Ingress>
            <IngressMarginTop>{texts.readMore.title}</IngressMarginTop>
            <ul>
                <li>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmeldt/hva-er-en-oppfolgingsplan"
                    >
                        {texts.readMore.linkLover}
                    </Link>
                </li>
                <li>
                    <Link target="_blank" rel="noopener noreferrer" href="https://www.nav.no/personvern">
                        {texts.readMore.linkPersonvern}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default OppfolgingsdialogerInfoPersonvern;
