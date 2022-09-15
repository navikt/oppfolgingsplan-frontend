import React from 'react';
import Sidetopp from '../Sidetopp';
import {
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    isEmpty,
} from '@/common/utils/oppfolgingsdialogUtils';
import {sykmeldtHarGyldigSykmelding, sykmeldtHarIngenSendteSykmeldinger} from '@/common/utils/sykmeldingUtils';
import IngenledereInfoboks from './IngenledereInfoboks';
import OppfolgingsdialogerVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import AvbruttPlanNotifikasjonBoksAdvarsel from './AvbruttPlanNotifikasjonBoksAdvarsel';
import OppfolgingsdialogUtenGyldigSykmelding from './OppfolgingsdialogUtenGyldigSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from './OppfolgingsdialogerUtenAktivSykmelding';
import {
    useKopierOppfolgingsplanSM,
    useOppfolgingsplanerSM
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";
import {useSykmeldingerSM} from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";

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

    const kopierOppfolgingsdialog = useKopierOppfolgingsplanSM(); //todo remove prop drilling

    const opprettOppfolgingsdialog: any = undefined;

    let panel;

    const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(
        oppfolgingsplaner
    );

    if (
        erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(
            oppfolgingsplaner,
            sykmeldinger,
            narmesteLedere
        )
    ) {
        panel = <IngenledereInfoboks/>;
    } else if (!sykmeldtHarGyldigSykmelding(sykmeldinger)) {
        panel = (
            <div>
                <div className="blokk--l">
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
        panel = (
            <OppfolgingsdialogerVisning
                oppfolgingsdialoger={oppfolgingsplaner}
                dinesykmeldinger={sykmeldinger}
                naermesteLedere={narmesteLedere}
                kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                opprettOppfolgingsdialog={opprettOppfolgingsdialog}
            />
        );
    }
    return (
        <div>
            {dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && (
                <AvbruttPlanNotifikasjonBoksAdvarsel
                    motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn}
                />
            )}
            <Sidetopp tittel={texts.pageTitle}/>
            <OppfolgingsdialogerInfoPersonvern/>

            {panel}
        </div>
    );
}

export default Oppfolgingsdialoger;
