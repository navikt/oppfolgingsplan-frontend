import {NextPage} from "next";
import {useOppfolgingsplanerSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {useNarmesteLedereSM} from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";
import Oppfolgingsdialoger from "../../old-sykmeldt-frontend/components/oppfolgingsdialoger/Oppfolgingsdialoger";
import React from "react";
import AppSpinner from "@/common/spinner/AppSpinner";
import Feilmelding from "../../old-sykmeldt-frontend/components/Feilmelding";
import OppfolgingsplanInfoboks from "../../old-sykmeldt-frontend/components/app/OppfolgingsplanInfoboks";
import {OppfolgingsdialogIkkeTilgangImage} from "@/common/images/imageComponents";
import Side from "../../old-sykmeldt-frontend/sider/Side";

const texts = {
    pageTitle: 'Oppfølgingsplaner - Oversikt',
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dineOppfolgingsplaner: 'Dine oppfølgingsplaner',
    },
    infoboksNoAccess: {
        title: 'Du har ikke tilgang til oppfølgingsplanen',
        info:
            'Du er registrert med en adressesperre og har av sikkerhetsgrunner derfor ikke tilgang til oppfølgingsplanen digitalt.',
    },
};

const Home: NextPage = () => {
    const oppfolgingsplaner = useOppfolgingsplanerSM();
    const sykmeldinger = useSykmeldingerSM();
    const narmesteLedere = useNarmesteLedereSM();

    const Content = () => {
        if (oppfolgingsplaner.isSuccess && sykmeldinger.isSuccess && narmesteLedere.isSuccess) {
            return <Oppfolgingsdialoger oppfolgingsplaner={oppfolgingsplaner.data} sykmeldinger={sykmeldinger.data}
                                        narmesteLedere={narmesteLedere.data}/>
        }
        return null;
    }

    return (
        <Side
            tittel={texts.pageTitle}
        >
            {(() => {
                if (oppfolgingsplaner.isLoading || sykmeldinger.isLoading || narmesteLedere.isLoading) {
                    return <AppSpinner/>;
                } else if (oppfolgingsplaner.isError || sykmeldinger.isError || narmesteLedere.isError) {
                    return <Feilmelding/>;
                } else if (false) { //todo !tilgang.data.harTilgang
                    return (
                        <OppfolgingsplanInfoboks
                            svgUrl={OppfolgingsdialogIkkeTilgangImage}
                            svgAlt=""
                            tittel={texts.infoboksNoAccess.title}
                            tekst={texts.infoboksNoAccess.info}
                        />
                    );
                }
                return <Content/>;
            })()}
        </Side>
    );
};

export default Home