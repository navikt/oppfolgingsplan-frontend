import React from 'react';
import {
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    isEmpty,
} from '@/common/utils/oppfolgingsdialogUtils';
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";
import {sykmeldtHarGyldigSykmelding, sykmeldtHarIngenSendteSykmeldinger} from "@/common/utils/sykmeldingUtils";
import {IngenLedereInfoBoks} from "@/common/components/infoboks/IngenLedereInfoBoks";
import {Alert, Heading} from "@navikt/ds-react";
import OppfolgingsdialogerVisning from "./OppfolgingsdialogerVisning";
import OppfolgingsdialogerInfoPersonvern from "./OppfolgingsdialogerInfoPersonvern";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsdialogUtenGyldigSykmelding from "./OppfolgingsdialogUtenGyldigSykmelding";

const texts = {
    pageTitle: 'Oppfølgingsplaner',
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
                            oppfolgingsplanerUtenAktivSykmelding={finnTidligereOppfolgingsdialoger(oppfolgingsplaner)}
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

            <Heading spacing={true} size={"large"} level={"1"}>{texts.pageTitle}</Heading>

            <OppfolgingsdialogerInfoPersonvern/>

            <Content/>
        </div>
    );
}

export default Oppfolgingsdialoger;
