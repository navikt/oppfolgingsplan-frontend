import {Alert, BodyLong, Button, Heading, Textarea, TextField} from "@navikt/ds-react";
import {DatoVelger} from "@/common/components/datovelger/DatoVelger";
import {useState} from "react";
import styled from "styled-components";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {useLagreTiltakSM} from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {LightGreyPanel} from "@/common/components/wrappers/LightGreyPanel";
import {Tiltak} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";
import Feilmelding from "@/common/components/error/Feilmelding";

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
    oppfolgingsplanId: number,
    tiltak: Tiltak,

    doneEditing(): void
}

export const EditerTiltak = ({oppfolgingsplanId, tiltak, doneEditing}: Props) => {
    const lagreTiltak = useLagreTiltakSM();
    const [tiltakNavn, setTiltakNavn] = useState<string>(tiltak.tiltaknavn)
    const [beskrivelse, setBeskrivelse] = useState<string>(tiltak.beskrivelse ? tiltak.beskrivelse : "")
    const [fom, setFom] = useState<Date | null>(tiltak.fom ? new Date(tiltak.fom) : null);
    const [tom, setTom] = useState<Date | null>(tiltak.tom ? new Date(tiltak.tom) : null);

    const tiltakInformasjon: Tiltak = {
        ...tiltak,
        tiltaknavn: tiltakNavn,
        beskrivelse: beskrivelse,
        fom: fom?.toJSON(),
        tom: tom?.toJSON()
    }

    const ErrorMessage = () => {
        if (lagreTiltak.isError) {
            return <Wrapper><Feilmelding/></Wrapper>
        }
        return null;
    }

    return (
        <TiltakPanel border={true}>
            <Heading spacing size="medium" level="3">Hva kan gjøre det lettere å jobbe?</Heading>
            <BodyLong spacing size="medium">Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva
                slags tilrettelegging det er mulig å tilby.</BodyLong>

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

                <ErrorMessage/>

                <ButtonRow>
                    <Button variant={"primary"} onClick={() => {
                        lagreTiltak.mutate({
                            oppfolgingsplanId: oppfolgingsplanId,
                            tiltak: tiltakInformasjon
                        });
                        doneEditing()
                    }}>Lagre</Button>
                    <Button variant={"tertiary"} onClick={() => doneEditing()}>Avbryt</Button>
                </ButtonRow>
            </LightGreyPanel>
        </TiltakPanel>
    )
}