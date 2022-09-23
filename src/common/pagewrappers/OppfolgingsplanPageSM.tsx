import {BodyLong, Heading} from "@navikt/ds-react";
import {OppfolgingsplanStepper} from "@/common/stepper/OppfolgingsplanStepper";
import React, {ReactElement, ReactNode} from "react";
import {Oppfolgingsplan, Stilling} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
    erOppfolgingsdialogTidligere
} from "@/common/utils/oppfolgingsdialogUtils";
import OppfolgingsplanInfoboks from "../../old-sykmeldt-frontend/components/app/OppfolgingsplanInfoboks";
import {OppfolgingsdialogIkkeTilgangImage} from "@/common/images/imageComponents";
import {useTilgangSM} from "@/common/api/queries/sykmeldt/tilgangQueries";
import Side from "../../old-sykmeldt-frontend/sider/Side";

const textOverskrift = (arbeidsgiver?: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const textStilling = (stilling: Stilling) => {
    return `Du jobber hos denne arbeidsgiveren som ${stilling.yrke.toLowerCase()} ${stilling.prosent} %`;
};

const texts = {
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dineOppfolgingsplaner: 'Dine oppfølgingsplaner',
        dinOppfolgingsplan: 'Oppfølgingsplan',
    },
    infoboksNotAvailable: {
        title: 'Du har ikke tilgang til oppfølgingsplanen',
    },
    infoboksNoAccess: {
        title: 'Du har ikke tilgang til oppfølgingsplanen',
        text:
            'Du er registrert med en adressesperre og har av sikkerhetsgrunner derfor ikke tilgang til oppfølgingsplanen digitalt.',
    },
}

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
                <OppfolgingsplanInfoboks
                    svgUrl={OppfolgingsdialogIkkeTilgangImage}
                    svgAlt=""
                    tittel={texts.infoboksNotAvailable.title}
                />
            )
        }

        if (tilgang.data && !tilgang.data.harTilgang) {
            return (
                <OppfolgingsplanInfoboks
                    svgUrl={OppfolgingsdialogIkkeTilgangImage}
                    svgAlt=""
                    tittel={texts.infoboksNoAccess.title}
                    tekst={texts.infoboksNoAccess.text}
                />
            )
        }

        return <>{children}</>
    }

    return (
        <Side isLoading={isLoading} tittel={titleText(page)}>
            <Heading spacing={true} level="1" size="large">{textOverskrift(oppfolgingsplan?.virksomhet?.navn)}</Heading>

            <OppfolgingsplanStepper activeStep={page.valueOf()}/>

            <Heading spacing={true} level="2" size="medium">{headingText(page)}</Heading>

            {stilling && <BodyLong spacing={true} size={"medium"}>{textStilling(stilling)}</BodyLong>}

            <Content/>
        </Side>
    )
}