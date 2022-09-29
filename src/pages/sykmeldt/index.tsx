import {NextPage} from "next";
import {useOppfolgingsplanerSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {useNarmesteLedereSM} from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";
import Oppfolgingsdialoger from "../../old-sykmeldt-frontend/components/oppfolgingsdialoger/Oppfolgingsdialoger";
import React from "react";
import Feilmelding from "../../old-sykmeldt-frontend/components/Feilmelding";
import Side from "../../old-sykmeldt-frontend/sider/Side";
import {useTilgangSM} from "@/common/api/queries/sykmeldt/tilgangQueries";
import {AdresseSperreInfoBoks} from "@/common/components/ikketilgang/AdresseSperreInfoBoks";

const texts = {
    pageTitle: 'Oppfølgingsplaner - Oversikt',
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dineOppfolgingsplaner: 'Dine oppfølgingsplaner',
    },
};

const Home: NextPage = () => {
    const tilgang = useTilgangSM();
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
            isLoading={oppfolgingsplaner.isLoading || sykmeldinger.isLoading || narmesteLedere.isLoading || tilgang.isLoading}
            tittel={texts.pageTitle}
        >
            {(() => {
                if (oppfolgingsplaner.isError || sykmeldinger.isError || narmesteLedere.isError || tilgang.isError) {
                    return <Feilmelding/>;
                } else if (tilgang.data && !tilgang.data.harTilgang) {
                    return (
                        <AdresseSperreInfoBoks/>
                    );
                }
                return <Content/>;
            })()}
        </Side>
    );
};

export default Home