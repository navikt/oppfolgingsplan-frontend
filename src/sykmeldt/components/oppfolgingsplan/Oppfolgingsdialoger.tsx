import React from 'react';
import {Alert, Heading} from "@navikt/ds-react";
import {
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    isEmpty,
} from '@/common/utils/oppfolgingsdialogUtils';
import {SykmeldingDTO} from "@/server/service/schema/sykmeldingSchema";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";
import {NarmesteLedereDTO} from "@/server/service/schema/narmestelederSchema";
import {sykmeldtHarGyldigSykmelding, sykmeldtHarIngenSendteSykmeldinger} from "@/common/utils/sykmeldingUtils";
import {IngenLedereInfoBoks} from "@/common/components/infoboks/IngenLedereInfoBoks";
import OppfolgingsdialogerVisning from "./OppfolgingsdialogerVisning";
import OppfolgingsdialogerInfoPersonvern from "./OppfolgingsdialogerInfoPersonvern";
import OppfolgingsdialogerUtenAktivSykmelding from "./OppfolgingsdialogerUtenAktivSykmelding";
import OppfolgingsdialogUtenGyldigSykmelding from "./OppfolgingsdialogUtenGyldigSykmelding";

const texts = {
    pageTitle: 'Oppfølgingsplaner',
};

interface Props {
    oppfolgingsplaner: OppfolgingsplanDTO[];
    sykmeldinger: SykmeldingDTO[];
    narmesteLedere: NarmesteLedereDTO;
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
