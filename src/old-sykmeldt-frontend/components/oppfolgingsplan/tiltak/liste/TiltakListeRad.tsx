import React from 'react';
import {STATUS_TILTAK} from '@/common/konstanter';
import {toDateMedMaanedNavn} from '@/common/utils/datoUtils';
import TiltakInformasjonKnapper from './TiltakInformasjonKnapper';
import {Tag} from "@navikt/ds-react";
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

const texts = {
    status: {
        avtalt: 'Avtalt',
        ikkAktuelt: 'Ikke aktuelt',
        foreslatt: 'Foreslått',
    },
};

interface Props {
    tiltak: Tiltak;
    fnr: string;

    sendSlett(): void;

    lagreSkjema: boolean;

    visLagreSkjema(): void;

    lagreKommentarSkjema: boolean;

    visLagreKommentarSkjema(): void;
}

const TiltakListeRad = ({
                            tiltak,
                            fnr,
                            sendSlett,
                            lagreSkjema,
                            visLagreSkjema,
                            lagreKommentarSkjema,
                            visLagreKommentarSkjema,
                        }: Props) => {
    let status = '';

    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            status = texts.status.avtalt;
            break;
        case STATUS_TILTAK.IKKE_AKTUELT:
            status = texts.status.ikkAktuelt;
            break;
        default:
            status = texts.status.foreslatt;
            break;
    }

    return (
        <div>
            <div className="tiltaktabell__rad__navn">
                <span className="tiltak__rad__navn--tittel">{tiltak.tiltaknavn}</span>
            </div>
            {tiltak.fom && tiltak.tom && tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT && (
                <p className="tiltaktabell__meta">
                    {toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}
                </p>
            )}
            {tiltak.status && (
                <Tag size={"small"} variant={tiltak.status === STATUS_TILTAK.AVTALT ? "success" : "warning"}>
                    {status}
                </Tag>
            )}
            <TiltakInformasjonKnapper
                tiltak={tiltak}
                fnr={fnr}
                lagreSkjema={lagreSkjema}
                visLagreSkjema={visLagreSkjema}
                sendSlett={sendSlett}
                lagreKommentarSkjema={lagreKommentarSkjema}
                visLagreKommentarSkjema={visLagreKommentarSkjema}
            />
        </div>
    );
};

export default TiltakListeRad;
