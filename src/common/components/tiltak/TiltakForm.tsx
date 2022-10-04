import {Alert, Button, ErrorSummary, Textarea, TextField} from "@navikt/ds-react";
import {LightGreyPanel} from "@/common/components/wrappers/LightGreyPanel";
import {DatoVelger} from "@/common/components/datovelger/DatoVelger";
import styled from "styled-components";
import {TiltakPanel} from "@/common/components/tiltak/TiltakPanel";
import {TiltakFormHeading} from "@/common/components/tiltak/TiltakFormHeading";
import {FormProvider, useForm} from "react-hook-form";
import React, {useRef} from "react";

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

export type FormValues = {
    overskrift: string;
    beskrivelse: string;
    fom: Date | null;
    tom: Date | null;
};

interface Props {
    onSubmit(data: FormValues): void;

    onCancel(): void;
}

export const TiltakForm = ({
                               onSubmit,
                               onCancel
                           }: Props) => {

    const errorRef = useRef<any>(null);

    const formFunctions = useForm<FormValues>();
    const {handleSubmit, register, formState: {errors}} = formFunctions
    const errorCount = Object.keys(errors).length;

    return (
        <FormProvider {...formFunctions} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TiltakPanel border={true}>
                    <TiltakFormHeading/>

                    <LightGreyPanel border={true}>

                        {errorCount > 0 && <ErrorSummary heading={`Du har ${errorCount} feil som må rettes opp i`} ref={errorRef}>
                            {Object.values(errors).map((err, index) => (
                                <ErrorSummary.Item key={index} href={"errors.overskrift.ref?.value"}>
                                    {err.message}
                                </ErrorSummary.Item>
                            ))}
                        </ErrorSummary>}

                        <OverskriftTextField label={"Overskrift (obligatorisk)"}
                                             error={errors.overskrift?.message}
                                             maxLength={80}  {...register("overskrift", {
                            required: "Du må gi en overskrift av tiltaket",
                            maxLength: 80
                        })}/>

                        <OverskriftTextarea label={"Beskriv hva som skal skje (obligatorisk)"}
                                            error={errors.beskrivelse?.message}
                                            description={"Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."}
                                            maxLength={600} {...register("beskrivelse", {
                            required: "Du må gi en beskrivelse av tiltaket",
                            maxLength: 600
                        })}/>

                        <SpacedAlert variant={"info"}>
                            Husk at arbeidsgiveren din kan se det du skriver her. Derfor må du ikke gi sensitive
                            opplysninger,
                            som for eksempel sykdomsdiagnose. Du må ikke si mer enn det som er helt nødvendig for at
                            arbeidsgiveren din og NAV kan følge deg opp
                        </SpacedAlert>

                        <DateRow>
                            <DatoVelger name="fom" label={"Startdato (obligatorisk)"} error={errors.fom?.message}/>

                            <DatoVelger name="tom" label={"Sluttdato (obligatorisk)"} error={errors.tom?.message}/>
                        </DateRow>

                        <ButtonRow>
                            <Button variant={"primary"} type={"submit"} onClick={() => {
                                if (errorCount > 0) {
                                    errorRef.current.focus();
                                }
                            }}>Lagre</Button>
                            <Button variant={"tertiary"} onClick={onCancel}>Avbryt</Button>
                        </ButtonRow>

                    </LightGreyPanel>
                </TiltakPanel>
            </form>
        </FormProvider>
    )
}