import React, {useState} from 'react';
import {
    finnAktiveOppfolgingsdialoger,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
} from '@/common/utils/oppfolgingsdialogUtils';
import getContextRoot from '@/common/utils/getContextRoot';
import OppfolgingsdialogerOpprett from './opprett/OppfolgingsdialogerOpprett';
import OppfolgingsdialogerIngenplan from './opprett/OppfolgingsdialogerIngenplan';
import OppfolgingsdialogTeasere from './OppfolgingsdialogTeasere';
import {Button} from "@navikt/ds-react";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {Sykmelding} from "@/types/oppfolgingsplanservice/sykmeldingType";
import {NarmesteLeder} from "@/types/oppfolgingsplanservice/NarmesteLederType";
import {
    useKopierOppfolgingsplanSM,
    useOpprettOppfolgingsplanSM
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {finnArbeidsgivereForGyldigeSykmeldinger} from "@/common/utils/sykmeldingUtils";
import VideoPanel from "@/common/video/VideoPanel";

const texts = {
    oppfolgingsdialogNyKnapp: {
        button: 'Lag en ny oppfølgingsplan',
    },
    oppfolgingsdialogerVisning: {
        teaserOutdatedPlaner: {
            title: 'Tidligere oppfølgingsplaner',
        },
        teaserAktive: {
            titleMultiplePlaner: 'Aktive oppfølgingsplaner',
            titleSinglePlan: 'Aktiv oppfølgingsplan',
        },
    },
};

interface Props {
    oppfolgingsplaner: Oppfolgingsplan[];
    sykmeldinger: Sykmelding[];
    narmesteLedere: NarmesteLeder[]
}

const OppfolgingsdialogerVisning = ({oppfolgingsplaner, sykmeldinger, narmesteLedere}: Props) => {
    const kopierOppfolgingsdialog = useKopierOppfolgingsplanSM(); //todo remove prop drilling
    const opprettOppfolgingsdialog = useOpprettOppfolgingsplanSM();

    const [visOppfolgingsdialogOpprett, setVisOppfolgingsdialogOpprett] = useState(false)

    const aktiveOppfolgingsplaner: Oppfolgingsplan[] = finnAktiveOppfolgingsdialoger(oppfolgingsplaner, sykmeldinger);

    const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
        sykmeldinger,
        narmesteLedere
    );
    return (
        <div>
            {visOppfolgingsdialogOpprett && (
                <OppfolgingsdialogerOpprett
                    oppfolgingsdialoger={oppfolgingsplaner}
                    arbeidsgivere={arbeidsgivereForSykmeldinger}
                    opprett={opprettOppfolgingsdialog}
                    kopier={kopierOppfolgingsdialog}
                    visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                    setVisOppfolgingsdialogOpprett={setVisOppfolgingsdialogOpprett}
                />
            )}
            {(oppfolgingsplaner.length === 0 || !(aktiveOppfolgingsplaner.length > 0)) && (
                <div className="blokk--l">
                    <OppfolgingsdialogerIngenplan
                        arbeidsgivere={arbeidsgivereForSykmeldinger}
                        oppfolgingsplaner={oppfolgingsplaner}
                        setVisOppfolgingsdialogOpprett={setVisOppfolgingsdialogOpprett}
                        opprett={(virksomhetsnummer: string) => opprettOppfolgingsdialog.mutate(virksomhetsnummer)}
                    />
                </div>
            )}
            {aktiveOppfolgingsplaner.length > 0 && (
                <div>
                    {arbeidsgivereForSykmeldinger.length > 1 && (
                        <div className="oppfolgingsdialogNyDialog">
                            <Button variant={"secondary"} size={"medium"}
                                    onClick={() => {
                                        setVisOppfolgingsdialogOpprett(true);
                                    }}
                            >
                                {texts.oppfolgingsdialogNyKnapp.button}
                            </Button>
                        </div>
                    )}
                    <OppfolgingsdialogTeasere
                        oppfolgingsplaner={aktiveOppfolgingsplaner}
                        tittel={
                            aktiveOppfolgingsplaner.length > 1
                                ? texts.oppfolgingsdialogerVisning.teaserAktive.titleMultiplePlaner
                                : texts.oppfolgingsdialogerVisning.teaserAktive.titleSinglePlan
                        }
                        rootUrlPlaner={getContextRoot()}
                    />
                </div>
            )}
            {harTidligereOppfolgingsdialoger(oppfolgingsplaner) && (
                <OppfolgingsdialogTeasere
                    oppfolgingsplaner={finnTidligereOppfolgingsdialoger(oppfolgingsplaner)}
                    harTidligerOppfolgingsdialoger
                    tittel={texts.oppfolgingsdialogerVisning.teaserOutdatedPlaner.title}
                    id="OppfolgingsdialogTeasereAT"
                    rootUrlPlaner={getContextRoot()}
                />
            )}
            <VideoPanel/>
        </div>
    );
}

export default OppfolgingsdialogerVisning;
