import React from 'react';
import GodkjennPlanOversiktInformasjon from './godkjenn/GodkjennPlanOversiktInformasjon';
import {oppfolgingsplanPt} from '../../../propTypes/opproptypes';
import {Accordion} from "@navikt/ds-react";

const PlanEkspanderbar = ({oppfolgingsplan}) => {
    const texts = {
        plan: {
            title: 'Se planen',
        },
    };

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {texts.plan.title}
                </Accordion.Header>
                <Accordion.Content>
                    <GodkjennPlanOversiktInformasjon oppfolgingsdialog={oppfolgingsplan}/>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
PlanEkspanderbar.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
};

export default PlanEkspanderbar;
