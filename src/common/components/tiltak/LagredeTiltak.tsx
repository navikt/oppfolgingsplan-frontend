import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {BodyLong, BodyShort, Button, Detail, Heading, Label, Tag} from "@navikt/ds-react";
import {toDateMedMaanedNavn} from "@/common/utils/datoUtils";
import {Delete, DialogDots, Edit} from "@navikt/ds-icons";
import styled from "styled-components";
import {ReactElement} from "react";

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

const createStatusLabel = (statusText?: string | null): ReactElement | null => {
    switch (statusText) {
        case "FORSLAG":
            return <Tag variant="warning" size="small">
                Foreslått
            </Tag>
        case "AVBRUTT":
            return <Tag variant="info" size="small">
                Avbrutt
            </Tag>
        case "IKKE_AKTUELT":
            return <Tag variant="error" size="small">
                Ikke aktuelt
            </Tag>
        case "AVTALT":
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

            <Detail spacing={true}>{`Foreslått av ${tiltak.opprettetAv.navn}`}</Detail>

            <ButtonRow>
                {aktoerHarOpprettetElement && <Button variant={"tertiary"} icon={<Edit/>}>Endre</Button>}
                {aktoerHarOpprettetElement && <Button variant={"tertiary"} icon={<Delete/>}>Slett</Button>}
                <Button variant={"tertiary"} icon={<DialogDots/>}>Kommenter</Button>
            </ButtonRow>
        </TiltakPanel>
    })

    return <>{alleTiltak}</>
}