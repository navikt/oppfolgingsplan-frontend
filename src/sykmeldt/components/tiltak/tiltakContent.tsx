import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import {NyttTiltak} from "@/common/components/tiltak/NyttTiltak";
import {BodyLong, BodyShort, Button, Detail, Heading, Label, Tag} from "@navikt/ds-react";
import {Delete, DialogDots, Edit} from "@navikt/ds-icons";
import styled from "styled-components";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {ReactElement} from "react";
import {toDateMedMaanedNavn} from "@/common/utils/datoUtils";

interface Props {
    oppfolgingsplan: Oppfolgingsplan
}

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`

const HeadingWithLabel = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin-bottom: 1rem;
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

export const TiltakContent = ({oppfolgingsplan}: Props) => {
    return (
        <div>
            <NyttTiltak/>

            {/*  Tiltakslista  */}
            {oppfolgingsplan.tiltakListe.map((tiltak, index) => {
                return <TiltakPanel key={index} border={true}>

                    <HeadingWithLabel>
                        {createStatusLabel(tiltak.status)}
                        <Heading size={"medium"} level={"3"}>{tiltak.tiltaknavn}</Heading>
                    </HeadingWithLabel>

                    {tiltak.fom && tiltak.tom &&
                        <BodyShort spacing={true}>{toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}</BodyShort>}

                    <Label>Beskrivelse</Label>
                    <BodyLong>{tiltak.beskrivelse}</BodyLong>

                    <Detail>{`Foreslått av ${tiltak.opprettetAv.navn}`}</Detail>

                    <ButtonRow>
                        <Button variant={"tertiary"} icon={<Edit/>}>Endre</Button>
                        <Button variant={"tertiary"} icon={<Delete/>}>Slett</Button>
                        <Button variant={"tertiary"} icon={<DialogDots/>}>Kommenter</Button>
                    </ButtonRow>
                </TiltakPanel>
            })}

        </div>
    )
}