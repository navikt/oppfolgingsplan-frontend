import React from 'react';
import {erOppfolgingsplanOpprettbarDirekte} from '@/common/utils/oppfolgingsdialogUtils';
import {OppfolgingsdialogTomImage} from '@/common/images/imageComponents';
import {Button, Panel} from "@navikt/ds-react";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {ArbeidsgivereForGyldigeSykmeldinger} from "@/common/utils/sykmeldingUtils";

const texts = {
    tittel: 'Aktiv oppfølgingsplan',
    inngangspanel: {
        tittel: 'Du har ingen aktiv oppfølgingsplan',
        paragraph:
            'Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene dine og noen forslag til hva som skal til for at du skal klare dem.',
    },
    knapper: {
        lagNy: 'Lag en ny plan',
    },
};

export const OppfolgingsdialogerIngenplanKnapper = ({
                                                        arbeidsgivere,
                                                        oppfolgingsplaner,
                                                        opprett,
                                                        setVisOppfolgingsdialogOpprett
                                                    }: OppfolgingsdialogerIngenplanProps) => {
    return (
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                {erOppfolgingsplanOpprettbarDirekte(arbeidsgivere, oppfolgingsplaner) ? (
                    <Button variant={"primary"}
                            onClick={() => {
                                opprett(arbeidsgivere[0].virksomhetsnummer);
                            }}
                    >
                        {texts.knapper.lagNy}
                    </Button>
                ) : (
                    <Button variant={"primary"}
                            onClick={() => {
                                setVisOppfolgingsdialogOpprett(true);
                            }}
                    >
                        {texts.knapper.lagNy}
                    </Button>
                )}
            </div>
        </div>
    );
};

interface OppfolgingsdialogerIngenplanProps {
    arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
    oppfolgingsplaner: Oppfolgingsplan[],

    opprett(virksomhetsnummer?: string | null): void;

    setVisOppfolgingsdialogOpprett(set: boolean): void;
}

const OppfolgingsdialogerIngenplan = ({
                                          arbeidsgivere,
                                          oppfolgingsplaner,
                                          opprett,
                                          setVisOppfolgingsdialogOpprett
                                      }: OppfolgingsdialogerIngenplanProps) => {
    return (
        <div className="oppfolgingsdialogerIngenplan">
            <header className="oppfolgingsdialogerIngenplan__header">
                <h2>{texts.tittel}</h2>
            </header>
            <Panel border={true}>
                <div className="oppfolgingsdialogerIngenplan__blokk">
                    <img alt="" src={OppfolgingsdialogTomImage}/>
                    <div className="inngangspanel__innhold">
                        <header className="inngangspanel__header">
                            <h3 className="js-title">
                                <span className="inngangspanel__tittel">{texts.inngangspanel.tittel}</span>
                            </h3>
                        </header>
                        <div>
                            <p className="oppfolgingsdialoger__start_tekst">{texts.inngangspanel.paragraph}</p>
                            <OppfolgingsdialogerIngenplanKnapper
                                arbeidsgivere={arbeidsgivere}
                                oppfolgingsplaner={oppfolgingsplaner}
                                opprett={opprett}
                                setVisOppfolgingsdialogOpprett={setVisOppfolgingsdialogOpprett}
                            />
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default OppfolgingsdialogerIngenplan;
