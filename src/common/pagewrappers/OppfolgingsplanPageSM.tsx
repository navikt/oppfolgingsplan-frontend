import {BodyLong, Heading} from "@navikt/ds-react";
import {OppfolgingsplanStepper} from "@/common/stepper/OppfolgingsplanStepper";
import React, {ReactElement, ReactNode} from "react";
import {Oppfolgingsplan, Stilling} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
    erOppfolgingsdialogTidligere
} from "@/common/utils/oppfolgingsdialogUtils";
import {useTilgangSM} from "@/common/api/queries/sykmeldt/tilgangQueries";
import {NavigationButtons} from "@/common/components/buttons/NavigationButtons";
import {IkkeTilgangTilPlanInfoBoks} from "@/common/components/infoboks/IkkeTilgangTilPlanInfoBoks";
import {AdresseSperreInfoBoks} from "@/common/components/infoboks/AdresseSperreInfoBoks";
import Side from "@/common/components/wrappers/Side";

const textOverskrift = (arbeidsgiver?: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const textStilling = (stilling: Stilling) => {
    return `Du jobber hos denne arbeidsgiveren som ${stilling.yrke.toLowerCase()} ${stilling.prosent} %`;
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

const titleText = (page: Page) => {
    switch (page) {
        case Page.ARBEIDSOPPGAVER:
            return "Oppfølgingsplan - Arbeidsoppgaver"
        case Page.TILTAK:
            return "Oppfølgingsplan - Tiltak"
        case Page.SEPLANEN:
            return "Oppfølgingsplan - Se planen"
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
    const sykmeldinger = useSykmeldingerSM();
    const tilgang = useTilgangSM();
    const stilling: Stilling | undefined = oppfolgingsplan && oppfolgingsplan.arbeidstaker.stillinger?.find(stilling => stilling.virksomhetsnummer == oppfolgingsplan.virksomhet.virksomhetsnummer)

    const erOppfolgingsdialogTilgjengelig =
        oppfolgingsplan && sykmeldinger.data &&
        (erOppfolgingsdialogTidligere(oppfolgingsplan) ||
            erOppfolgingsdialogKnyttetTilGyldigSykmelding(oppfolgingsplan, sykmeldinger.data));


    const Content = (): ReactElement => {
        if (isError) {
            return <div>todo feil feil</div>
        }

        if (!erOppfolgingsdialogTilgjengelig) {
            return (
                <IkkeTilgangTilPlanInfoBoks/>
            )
        }

        if (tilgang.data && !tilgang.data.harTilgang) {
            return (
                <AdresseSperreInfoBoks/>
            )
        }

        return <>{children}</>
    }

    return (
        <Side isLoading={isLoading || tilgang.isLoading || sykmeldinger.isLoading} tittel={titleText(page)}>
            <Heading spacing={true} level="1" size="large">{textOverskrift(oppfolgingsplan?.virksomhet?.navn)}</Heading>

            <OppfolgingsplanStepper activeStep={page.valueOf()}/>

            <Heading spacing={true} level="2" size="medium">{headingText(page)}</Heading>

            {stilling && <BodyLong spacing={true} size={"medium"}>{textStilling(stilling)}</BodyLong>}

            <Content/>

            <NavigationButtons activeStep={page.valueOf()}/>
        </Side>
    )
}