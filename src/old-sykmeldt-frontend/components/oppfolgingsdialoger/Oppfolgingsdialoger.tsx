import React from 'react';
import Sidetopp from '../Sidetopp';
import {
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    isEmpty,
} from '@/common/utils/oppfolgingsdialogUtils';
import OppfolgingsdialogerVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogUtenGyldigSykmelding from './OppfolgingsdialogUtenGyldigSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from './OppfolgingsdialogerUtenAktivSykmelding';
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";
import {sykmeldtHarGyldigSykmelding, sykmeldtHarIngenSendteSykmeldinger} from "@/common/utils/sykmeldingUtils";
import OppfolgingsdialogerInfoPersonvern from "./OppfolgingsdialogerInfoPersonvern";
import {IngenLedereInfoBoks} from "@/common/components/infoboks/IngenLedereInfoBoks";
import {Alert} from "@navikt/ds-react";

const texts = {
    pageTitle: 'Oppfølgingsplaner',
    noActiveSykmelding: {
        titleTidligerePlaner: 'Tidligere oppfølgingsplaner',
    },
};

interface Props {
    oppfolgingsplaner: Oppfolgingsplan[];
    sykmeldinger: Sykmelding[];
    narmesteLedere: NarmesteLeder[];
}

const Oppfolgingsdialoger = ({oppfolgingsplaner, sykmeldinger, narmesteLedere}: Props) => {

    const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(
        oppfolgingsplaner
    );

    const Content = () => {
        if (
            erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(
                oppfolgingsplaner,
                sykmeldinger,
                narmesteLedere
            )
        ) {
            return <IngenLedereInfoBoks/>
        } else if (!sykmeldtHarGyldigSykmelding(sykmeldinger)) {
            return (
                <div>
                    <div>
                        <OppfolgingsdialogUtenGyldigSykmelding
                            sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(sykmeldinger)}
                        />
                    </div>

                    {!isEmpty(oppfolgingsplaner) && harTidligereOppfolgingsdialoger(oppfolgingsplaner) && (
                        <OppfolgingsdialogerUtenAktivSykmelding
                            oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsplaner)}
                            tittel={texts.noActiveSykmelding.titleTidligerePlaner}
                        />
                    )}
                </div>
            );
        } else {
            return (
                <OppfolgingsdialogerVisning
                    oppfolgingsplaner={oppfolgingsplaner}
                    sykmeldinger={sykmeldinger}
                    narmesteLedere={narmesteLedere}
                />
            );
        }
    }


    return (
        <div>
            {dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && (
                <Alert variant={"info"}>`${dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn} har startet
                    en ny oppfølgingsplan. Den gamle er arkivert.`</Alert>
            )}
            <Sidetopp tittel={texts.pageTitle}/>

            <OppfolgingsdialogerInfoPersonvern/>

            <Content/>
        </div>
    );
}

export default Oppfolgingsdialoger;
