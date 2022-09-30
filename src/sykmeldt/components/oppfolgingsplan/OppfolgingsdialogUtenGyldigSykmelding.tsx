import React from 'react';
import {OppfolgingsdialogIkkeAktivSykmeldingImage} from '@/common/images/imageComponents';
import {BodyLong, Heading, Panel} from "@navikt/ds-react";
import Image from "next/image";

const texts = {
    title: 'Aktiv oppfølgingsplan',
    infoIngenGyldigeSykmeldinger: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke er sykmeldt nå.',
    infoIngenSendteSykmeldinger: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke har sendt inn sykmeldingen din.',
};

interface Props {
    sykmeldtHarIngenSendteSykmeldinger: boolean
}

const OppfolgingsdialogUtenGyldigSykmelding = ({sykmeldtHarIngenSendteSykmeldinger}: Props) => {
    return (
        <div>
            <Heading size={"medium"} level={"2"}>{texts.title}</Heading>

            <Panel border={true}>
                <div>
                    <Image alt="" src={OppfolgingsdialogIkkeAktivSykmeldingImage}/>
                    <div>
                        {sykmeldtHarIngenSendteSykmeldinger ? (
                            <BodyLong>{texts.infoIngenSendteSykmeldinger}</BodyLong>
                        ) : (
                            <BodyLong>{texts.infoIngenGyldigeSykmeldinger}</BodyLong>
                        )}
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default OppfolgingsdialogUtenGyldigSykmelding;
