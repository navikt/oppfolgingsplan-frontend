import {Alert, Button, Textarea, TextField} from "@navikt/ds-react";
import {LightGreyPanel} from "@/common/components/wrappers/LightGreyPanel";
import {DatoVelger} from "@/common/components/datovelger/DatoVelger";
import styled from "styled-components";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import Feilmelding from "@/common/components/error/Feilmelding";
import {TiltakFormHeading} from "@/common/components/tiltak/TiltakFormHeading";

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

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

interface Props {
    tiltakNavn: string;

    setTiltakNavn(newName: string): void;

    beskrivelse: string;

    setBeskrivelse(newName: string): void;

    fom: Date | null;

    setFom(newDate: Date | null): void;

    tom: Date | null;

    setTom(newDate: Date | null): void;

    displayError: boolean;

    onSave(): void;

    onCancel(): void;
}

export const TiltakForm = ({
                               tiltakNavn,
                               setTiltakNavn,
                               beskrivelse,
                               setBeskrivelse,
                               fom,
                               setFom,
                               tom,
                               setTom,
                               displayError,
                               onSave,
                               onCancel
                           }: Props) => {
    return (
        <TiltakPanel border={true}>
            <TiltakFormHeading/>

            <LightGreyPanel border={true}>
                <OverskriftTextField label={"Overskrift (obligatorisk)"} maxLength={80} value={tiltakNavn}
                                     onChange={(e) => setTiltakNavn(e.target.value)}/>

                <OverskriftTextarea label={"Beskriv hva som skal skje (obligatorisk)"}
                                    description={"Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."}
                                    maxLength={600} value={beskrivelse}
                                    onChange={(e) => setBeskrivelse(e.target.value)}/>

                <SpacedAlert variant={"info"}>
                    Husk at arbeidsgiveren din kan se det du skriver her. Derfor må du ikke gi sensitive opplysninger,
                    som for eksempel sykdomsdiagnose. Du må ikke si mer enn det som er helt nødvendig for at
                    arbeidsgiveren din og NAV kan følge deg opp
                </SpacedAlert>

                <DateRow>
                    <DatoVelger label={"Startdato (obligatorisk)"} selectedDate={fom} onChange={setFom}/>

                    <DatoVelger label={"Sluttdato (obligatorisk)"} selectedDate={tom} onChange={setTom}/>
                </DateRow>

                {displayError && <Wrapper><Feilmelding/></Wrapper>}

                <ButtonRow>
                    <Button variant={"primary"} onClick={onSave}>Lagre</Button>
                    <Button variant={"tertiary"} onClick={onCancel}>Avbryt</Button>
                </ButtonRow>
            </LightGreyPanel>
        </TiltakPanel>
    )
}