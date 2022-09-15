import React from 'react';
import {Alert} from "@navikt/ds-react";

const texts = {
    title: 'Hva skjer nå?',
    infolist: {
        ingress: 'Lederen din kan godkjenne eller gjøre endringer i oppfølgingsplanen.',
        noChangesApproval: 'Godkjenner lederen, har dere opprettet en plan.',
        changesWithAproval: 'Gjør lederen endringer, får du en melding om at du kan ta stilling til endringene.',
        changesNoApproval: `
            Får du ikke noen melding, er det mulig at lederen din ikke har tatt stilling til planen ennå. Du kan gå inn i oppfølgingsplanen for å se om det har skjedd noe.
        `,
    },
};

const GodkjennPlanVenterInfo = () => {
    return (
        <Alert className="alertstripe--notifikasjonboks" variant="info">
            <h3 className="panel__tittel">{texts.title}</h3>
            <p>{texts.infolist.ingress}</p>
            <ul>
                <li>{texts.infolist.noChangesApproval}</li>
                <li>{texts.infolist.changesWithAproval}</li>
                <li>{texts.infolist.changesNoApproval}</li>
            </ul>
        </Alert>
    );
};

export default GodkjennPlanVenterInfo;
