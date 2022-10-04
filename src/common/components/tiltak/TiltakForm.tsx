import { Alert, Button, Textarea, TextField } from "@navikt/ds-react";
import { LightGreyPanel } from "@/common/components/wrappers/LightGreyPanel";
import { DatoVelger } from "@/common/components/datovelger/DatoVelger";
import styled from "styled-components";
import { TiltakPanel } from "@/common/components/tiltak/TiltakPanel";
import { TiltakFormHeading } from "@/common/components/tiltak/TiltakFormHeading";
import { FormProvider, useForm } from "react-hook-form";
import React, { useRef } from "react";
import { FormErrorSummary } from "@/common/components/error/FormErrorSummary";

const OverskriftTextField = styled(TextField)`
  margin-bottom: 2rem;
`;

const OverskriftTextarea = styled(Textarea)`
  margin-bottom: 2rem;
`;

const DateRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SpacedAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

export type FormValues = {
  overskrift: string;
  beskrivelse: string;
  fom: Date | null;
  tom: Date | null;
};

interface Props {
  onSubmit(data: FormValues): void;

  onCancel(): void;

  defaultFormValues?: FormValues;
}

export const TiltakForm = ({
  onSubmit,
  onCancel,
  defaultFormValues,
}: Props) => {
  const errorRef = useRef<any>(null);

  const formFunctions = useForm<FormValues>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formFunctions;

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TiltakPanel border={true}>
          <TiltakFormHeading />

          <LightGreyPanel border={true}>
            <FormErrorSummary errors={errors} ref={errorRef} />

            <OverskriftTextField
              id="overskrift"
              label={"Overskrift (obligatorisk)"}
              error={errors.overskrift?.message}
              defaultValue={defaultFormValues?.overskrift}
              maxLength={80}
              {...register("overskrift", {
                required: "Du må gi en overskrift av tiltaket",
                maxLength: 80,
              })}
            />

            <OverskriftTextarea
              id="beskrivelse"
              label={"Beskriv hva som skal skje (obligatorisk)"}
              error={errors.beskrivelse?.message}
              defaultValue={defaultFormValues?.beskrivelse}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              maxLength={600}
              {...register("beskrivelse", {
                required: "Du må gi en beskrivelse av tiltaket",
                maxLength: 600,
              })}
            />

            <SpacedAlert variant={"info"}>
              Husk at arbeidsgiveren din kan se det du skriver her. Derfor må du
              ikke gi sensitive opplysninger, som for eksempel sykdomsdiagnose.
              Du må ikke si mer enn det som er helt nødvendig for at
              arbeidsgiveren din og NAV kan følge deg opp
            </SpacedAlert>

            <DateRow>
              <DatoVelger
                name="fom"
                label={"Startdato (obligatorisk)"}
                defaultValue={defaultFormValues?.fom}
                error={errors.fom?.message}
              />

              <DatoVelger
                name="tom"
                label={"Sluttdato (obligatorisk)"}
                defaultValue={defaultFormValues?.tom}
                error={errors.tom?.message}
              />
            </DateRow>

            <ButtonRow>
              <Button
                variant={"primary"}
                type={"submit"}
                onClick={() => {
                  if (Object.keys(errors).length > 0) {
                    errorRef.current.focus();
                  }
                }}
              >
                Lagre
              </Button>
              <Button variant={"tertiary"} onClick={onCancel}>
                Avbryt
              </Button>
            </ButtonRow>
          </LightGreyPanel>
        </TiltakPanel>
      </form>
    </FormProvider>
  );
};
