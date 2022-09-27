import {NextPage} from "next";
import Feilmelding from "../../../old-sykmeldt-frontend/components/Feilmelding";
import OppfolgingsplanInfoboks from "../../../old-sykmeldt-frontend/components/app/OppfolgingsplanInfoboks";
import {OppfolgingsdialogIkkeTilgangImage} from "@/common/images/imageComponents";
import Oppfolgingsdialog from "../../../old-sykmeldt-frontend/components/oppfolgingsplan/Oppfolgingsdialog";
import Side from "../../../old-sykmeldt-frontend/sider/Side";
import React from "react";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {useOppfolgingsplanerSM, useOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useTilgangSM} from "@/common/api/queries/sykmeldt/tilgangQueries";
import {
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
    erOppfolgingsdialogTidligere
} from "@/common/utils/oppfolgingsdialogUtils";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";

const pageTitleArbeidsoppgaver = 'Oppfølgingsplan - Arbeidsoppgaver';
const pageTitleTiltak = 'Oppfølgingsplan - Tiltak';
const pageTitleSePlanen = 'Oppfølgingsplan - Se planen';
const pageTitleOppsummering = 'Oppfølgingsplan - Oppsummering';

const texts = {
    pageTitles: [pageTitleArbeidsoppgaver, pageTitleTiltak, pageTitleSePlanen],
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
};

const Page: NextPage = () => {
    const oppfolgingsdialogId = useOppfolgingsplanRouteId();
    const oppfolgingsplaner = useOppfolgingsplanerSM();
    const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId)
    const tilgang = useTilgangSM();
    const sykmeldinger = useSykmeldingerSM();

    const erOppfolgingsdialogTilgjengelig =
        aktivPlan && sykmeldinger.data &&
        (erOppfolgingsdialogTidligere(aktivPlan) ||
            erOppfolgingsdialogKnyttetTilGyldigSykmelding(aktivPlan, sykmeldinger.data));

    return (
        <Side
            isLoading={oppfolgingsplaner.isLoading || tilgang.isLoading}
            tittel={pageTitleSePlanen}
        >
            {(() => {
                if (oppfolgingsplaner.isError || tilgang.isError) {
                    return <Feilmelding/>;
                } else if (!erOppfolgingsdialogTilgjengelig) {
                    return (
                        <OppfolgingsplanInfoboks
                            svgUrl={OppfolgingsdialogIkkeTilgangImage}
                            svgAlt=""
                            tittel={texts.infoboksNotAvailable.title}
                        />
                    );
                } else if (tilgang.data && !tilgang.data.harTilgang) {
                    return (
                        <OppfolgingsplanInfoboks
                            svgUrl={OppfolgingsdialogIkkeTilgangImage}
                            svgAlt=""
                            tittel={texts.infoboksNoAccess.title}
                            tekst={texts.infoboksNoAccess.text}
                        />
                    );
                }
                return <Oppfolgingsdialog aktivPlan={aktivPlan}/>;
            })()}
        </Side>
    );
};

export default Page