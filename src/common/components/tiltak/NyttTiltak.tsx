import {Alert, BodyLong, Button, Heading, Textarea, TextField} from "@navikt/ds-react";
import PlusIcon from "@/common/icons/PlusIcon";
import {DatoVelger} from "@/common/components/datovelger/DatoVelger";
import {useState} from "react";
import styled from "styled-components";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {useLagreTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {LightGreyPanel} from "@/common/components/wrappers/LightGreyPanel";

const OverskriftTextField = styled(TextField)`
  margin-bottom: 2rem;
`

const OverskriftTextarea = styled(Textarea)`
  margin-bottom: 2rem;
`

const DateRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`

const SpacedAlert = styled(Alert)`
  margin-bottom: 2rem;
`

interface Props {
    oppfolgingsplanId: number
}

export const NyttTiltak = ({oppfolgingsplanId}: Props) => {
    const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false)
    const lagreTiltak = useLagreTiltakSM();

    return (
        <TiltakPanel border={true}>
            <Heading spacing size="medium" level="3">Hva kan gjøre det lettere å jobbe?</Heading>
            <BodyLong spacing size="medium">Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva
                slags tilrettelegging det er mulig å tilby.</BodyLong>

            {!leggerTilNyttTiltak &&
                <Button variant={"secondary"} icon={<PlusIcon/>} onClick={() => setLeggerTilNyttTiltak(true)}>Legg til
                    et nytt tiltak</Button>}

            {leggerTilNyttTiltak && <LightGreyPanel border={true}>
                <OverskriftTextField label={"Overskrift (obligatorisk)"} maxLength={80}/>

                <OverskriftTextarea label={"Beskriv hva som skal skje (obligatorisk)"}
                                    description={"Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."}
                                    maxLength={600}/>

                <SpacedAlert variant={"info"}>
                    Husk at arbeidsgiveren din kan se det du skriver her. Derfor må du ikke gi sensitive opplysninger,
                    som for eksempel sykdomsdiagnose. Du må ikke si mer enn det som er helt nødvendig for at
                    arbeidsgiveren din og NAV kan følge deg opp
                </SpacedAlert>

                <DateRow>
                    <DatoVelger label={"Startdato (obligatorisk)"}/>

                    <DatoVelger label={"Sluttdato (obligatorisk)"}/>
                </DateRow>

                <ButtonRow>
                    <Button variant={"primary"} onClick={() => lagreTiltak.mutate(oppfolgingsplanId)}>Lagre</Button>
                    <Button variant={"tertiary"} onClick={() => setLeggerTilNyttTiltak(false)}>Avbryt</Button>
                </ButtonRow>
            </LightGreyPanel>}
        </TiltakPanel>
    )
}