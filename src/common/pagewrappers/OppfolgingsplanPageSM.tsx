import {Heading} from "@navikt/ds-react";
import {OppfolgingsplanStepper} from "@/common/stepper/OppfolgingsplanStepper";
import React, {ReactNode} from "react";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import AppSpinner from "@/common/spinner/AppSpinner";

const textOverskrift = (arbeidsgiver?: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

export enum Page {
    ARBEIDSOPPGAVER = 1,
    TILTAK = 2,
    SEPLANEN = 3
}

const headingText = (page: Page) => {
    switch (page) {
        case Page.ARBEIDSOPPGAVER:
            return "Arbeidsoppgaver"
        case Page.TILTAK:
            return "Tiltak"
        case Page.SEPLANEN:
            return "Se planen"
    }
}

interface Props {
    isLoading: boolean,
    isError: boolean,
    page: Page,
    oppfolgingsplan?: Oppfolgingsplan,
    children: ReactNode,
}

export const OppfolgingsplanPageSM = ({isLoading, isError, page, oppfolgingsplan, children}: Props) => {
    if (isLoading) {
        return <AppSpinner />
    }

    if (isError) {
        <div>todo feil feil</div>
    }

    return (
        <div>
            <Heading spacing={true} level="1" size="large">{textOverskrift(oppfolgingsplan?.virksomhet?.navn)}</Heading>

            <OppfolgingsplanStepper activeStep={page.valueOf()}/>

            <Heading spacing={true} level="2" size="medium">{headingText(page)}</Heading>

            {children}
        </div>
    )
}