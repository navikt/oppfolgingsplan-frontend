import React from 'react';
import Side from '../../sider/Side';
import Feilmelding from '../Feilmelding';
import Oppfolgingsdialoger from './Oppfolgingsdialoger';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import {OppfolgingsdialogIkkeTilgangImage} from '@/common/images/imageComponents';
import AppSpinner from "@/common/spinner/AppSpinner";
import {useOppfolgingsplanerSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {useNarmesteLedereSM} from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";

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

export const OppfolgingsdialogerSide = () => {

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

    // UNSAFE_componentWillMount() {
    //     const {tilgang, oppfolgingsdialogerReducer} = this.props;
    //     if (!henterEllerHarHentetTilgang(tilgang)) {
    //         this.props.sjekkTilgang();
    //     }
    //     this.props.hentDineSykmeldinger();
    //     if (!henterEllerHarHentetOppfolgingsplaner(oppfolgingsdialogerReducer)) {
    //         this.props.hentOppfolgingsdialoger();
    //     }
    //     // window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    //     // window.sessionStorage.removeItem('startdato');
    //     // window.sessionStorage.removeItem('sluttdato');
    //     // window.sessionStorage.removeItem('evalueringsdato');
    // }
    //
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     const {kopierDialogReducer, oppfolgingsdialogerReducer} = this.props;
    //     if (oppfolgingsplanHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
    //         window && window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    //         this.props.hentOppfolgingsdialoger();
    //     }
    //     if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
    //         window && window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    //         this.props.hentOppfolgingsdialoger();
    //     }
    //     if (
    //         oppfolgingsdialogerReducer.opprettet &&
    //         !oppfolgingsdialogerReducer.hentet &&
    //         nextProps.oppfolgingsdialogerReducer.hentet
    //     ) {
    //         this.props.router.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
    //     }
    //     if (
    //         kopierDialogReducer.sendt &&
    //         !oppfolgingsdialogerReducer.hentet &&
    //         nextProps.oppfolgingsdialogerReducer.hentet
    //     ) {
    //         this.props.router.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.kopierDialogReducer.data}`);
    //     }
    // }

    // render() {
    //     const {brodsmuler, henter, hentingFeilet, tilgang, hentet, sender, sendingFeilet} = this.props;
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
}

// export const mapStateToProps = (state) => {
//     const oppfolgingsdialoger = state.oppfolgingsdialoger.data.map((oppfolgingsdialog) => {
//         return populerPlanFraState(oppfolgingsdialog, state);
//     });
//     return {
//         henter:
//             state.oppfolgingsdialoger.henter || state.tilgang.henter || state.dineSykmeldinger.henter || state.ledere.henter,
//         hentingFeilet:
//             state.oppfolgingsdialoger.hentingFeilet ||
//             state.tilgang.hentingFeilet ||
//             state.dineSykmeldinger.hentingFeilet ||
//             state.ledere.hentingFeilet,
//         hentet:
//             state.tilgang.hentet ||
//             state.dineSykmeldinger.hentet ||
//             state.ledere.hentet ||
//             state.oppfolgingsdialoger.hentet ||
//             state.oppfolgingsdialoger.opprettet,
//         sender: state.oppfolgingsdialoger.oppretter || state.kopierDialogReducer.sender,
//         sendingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.kopierDialogReducer.sendingFeilet,
//         dinesykmeldinger: state.dineSykmeldinger,
//         naermesteleder: state.naermesteleder,
//         kopierDialogReducer: state.kopierDialogReducer,
//         naermesteLedere: state.ledere,
//         oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
//         person: state.person,
//         tilgang: state.tilgang,
//         virksomhet: state.virksomhet,
//         bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
//         oppfolgingsdialoger,
//         brodsmuler: [
//             {
//                 tittel: texts.brodsmuler.dittSykefravaer,
//                 sti: process.env.REACT_APP_SYKEFRAVAER_ROOT,
//                 erKlikkbar: true,
//             },
//             {
//                 tittel: texts.brodsmuler.dineOppfolgingsplaner,
//                 sti: '/oppfolgingsplaner',
//             },
//         ],
//     };
// };

export default OppfolgingsdialogerSide;
