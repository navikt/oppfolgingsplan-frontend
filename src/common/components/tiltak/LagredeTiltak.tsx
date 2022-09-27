import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {Alert, BodyLong, BodyShort, Button, Detail, Heading, Label, Tag} from "@navikt/ds-react";
import {toDateMedMaanedNavn} from "@/common/utils/dateUtils";
import {Delete, DialogDots, Edit} from "@navikt/ds-icons";
import styled from "styled-components";
import React, {ReactElement} from "react";
import {Dialog} from "@/common/components/dialog/Dialog";
import {STATUS_TILTAK} from "@/common/konstanter";

interface Props {
    arbeidstakerFnr?: string | null;
    tiltakListe: Tiltak[] | null;
}

const HeadingWithLabel = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`

const manglerVurderingFraLeder = (fnr: string, tiltak: Tiltak) => {
    return (
        tiltak &&
        !tiltak.gjennomfoering &&
        !tiltak.beskrivelseIkkeAktuelt &&
        fnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr) &&
        tiltak.sistEndretAv.fnr === fnr
    );
};

export const SpacedAlert = styled(Alert)`
  margin-bottom: 1rem;
`

export const SpacedDetail = styled(Detail)`
  margin-bottom: 1rem;
`

const createStatusLabel = (statusText?: string | null): ReactElement | null => {
    switch (statusText) {
        case STATUS_TILTAK.FORSLAG:
            return <Tag variant="warning" size="small">
                Foreslått
            </Tag>
        case STATUS_TILTAK.AVBRUTT:
            return <Tag variant="info" size="small">
                Avbrutt
            </Tag>
        case STATUS_TILTAK.IKKE_AKTUELT:
            return <Tag variant="error" size="small">
                Ikke aktuelt
            </Tag>
        case STATUS_TILTAK.AVTALT:
            return <Tag variant="success" size="small">
                Avtalt
            </Tag>
    }
    return null
}

export const LagredeTiltak = ({arbeidstakerFnr, tiltakListe}: Props): ReactElement | null => {
    if (!tiltakListe || !arbeidstakerFnr) return null

    const alleTiltak = tiltakListe.map((tiltak, index) => {
        const aktoerHarOpprettetElement = arbeidstakerFnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr);

        return <TiltakPanel key={index} border={true}>
            <HeadingWithLabel>
                {createStatusLabel(tiltak.status)}
                <Heading size={"medium"} level={"3"}>{tiltak.tiltaknavn}</Heading>
            </HeadingWithLabel>

            {tiltak.fom && tiltak.tom &&
                <BodyShort
                    spacing={true}>{toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}</BodyShort>}

            <Label>Beskrivelse</Label>
            <BodyLong spacing={true}>{tiltak.beskrivelse}</BodyLong>

            {tiltak.status == "IKKE_AKTUELT" && tiltak.beskrivelseIkkeAktuelt && <>
                <Label>Arbeidsgivers vurdering</Label>
                <BodyLong spacing={true}>{tiltak.beskrivelseIkkeAktuelt}</BodyLong>
            </>
            }

            {manglerVurderingFraLeder(arbeidstakerFnr, tiltak) &&
                <SpacedAlert variant={"warning"}>Dette tiltaket mangler en vurdering fra lederen din</SpacedAlert>}

            {tiltak.gjennomfoering && tiltak.status === STATUS_TILTAK.AVTALT && (
                <>
                    <Label>Oppfølging og gjennomføring</Label>
                    <BodyLong spacing={true}>{tiltak.gjennomfoering}</BodyLong>
                </>
            )}

            <SpacedDetail>{`Foreslått av ${tiltak.opprettetAv.navn}`}</SpacedDetail>

            <Dialog tiltakId={tiltak.tiltakId} kommentarer={tiltak.kommentarer} aktorFnr={arbeidstakerFnr}/>

            <ButtonRow>
                {aktoerHarOpprettetElement && <Button variant={"tertiary"} icon={<Edit/>}>Endre</Button>}
                {aktoerHarOpprettetElement && <Button variant={"tertiary"} icon={<Delete/>}>Slett</Button>}
                <Button variant={"tertiary"} icon={<DialogDots/>}>Kommenter</Button>
            </ButtonRow>
        </TiltakPanel>
    })

    return <>{alleTiltak}</>
}