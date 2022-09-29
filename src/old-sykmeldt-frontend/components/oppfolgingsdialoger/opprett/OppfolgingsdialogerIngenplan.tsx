import React from 'react';
import {erOppfolgingsplanOpprettbarDirekte} from '@/common/utils/oppfolgingsdialogUtils';
import {OppfolgingsdialogTomImage} from '@/common/images/imageComponents';
import {BodyLong, Button, Heading, Panel} from "@navikt/ds-react";
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {ArbeidsgivereForGyldigeSykmeldinger} from "@/common/utils/sykmeldingUtils";
import {useOpprettOppfolgingsplanSM} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import Image from "next/image";
import styled from "styled-components";

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

const PanelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  width: 12rem;
`;

interface OppfolgingsdialogerIngenplanProps {
    arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
    oppfolgingsplaner: Oppfolgingsplan[],

    setVisOppfolgingsdialogOpprett(set: boolean): void;
}

const OppfolgingsdialogerIngenplan = ({
                                          arbeidsgivere,
                                          oppfolgingsplaner,
                                          setVisOppfolgingsdialogOpprett
                                      }: OppfolgingsdialogerIngenplanProps) => {

    const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();

    return (
        <div>
            <Heading spacing={true} size={"medium"} level={"2"}>
                {texts.tittel}
            </Heading>

            <Panel border={true}>
                <PanelContent>
                    <ImageContainer>
                        <Image alt="" src={OppfolgingsdialogTomImage}/>
                    </ImageContainer>

                    <div>
                        <Heading spacing={true} size={"small"} level={"3"}>{texts.inngangspanel.tittel}</Heading>

                        <div>
                            <BodyLong spacing={true}>{texts.inngangspanel.paragraph}</BodyLong>
                            <div>
                                {erOppfolgingsplanOpprettbarDirekte(arbeidsgivere, oppfolgingsplaner) ? (
                                    <Button variant={"primary"}
                                            onClick={() => {
                                                opprettOppfolgingsplan.mutate(arbeidsgivere[0].virksomhetsnummer);
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
                    </div>
                </PanelContent>
            </Panel>
        </div>
    );
};

export default OppfolgingsdialogerIngenplan;
