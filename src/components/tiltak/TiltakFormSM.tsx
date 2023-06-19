import { Alert, Button, Textarea, TextField } from "@navikt/ds-react";
import { FormProvider, useForm } from "react-hook-form";
import React, { useRef } from "react";
import { LightGreyPanel } from "../blocks/wrappers/LightGreyPanel";
import { FormErrorSummary } from "../blocks/error/FormErrorSummary";
import { Row } from "../blocks/wrappers/Row";
import { TiltakFormValues } from "./utils/typer";
import { TiltakStartSluttDato } from "./TiltakStartSluttDato";
import {
  TILTAK_BESKRIVELSE_TEXTAREA,
  TILTAK_LAGRE_BUTTON,
  TILTAK_OVERSKRIFT_TEXTFIELD,
} from "../../../cypress/dataTestId";

const arbeidstakerInfoText =
  "Husk at arbeidsgiveren din kan se det du skriver her. Derfor må du\n" +
  " ikke gi sensitive opplysninger, som for eksempel sykdomsdiagnose. Du\n" +
  " må ikke si mer enn det som er helt nødvendig for at arbeidsgiveren\n" +
  " din og NAV kan følge deg opp";

interface Props {
  isSubmitting: boolean;

  onSubmit(data: TiltakFormValues): void;

  onCancel(): void;

  defaultFormValues?: TiltakFormValues;
}

export const TiltakFormSM = ({
  isSubmitting,
  onSubmit,
  onCancel,
  defaultFormValues,
}: Props) => {
  const errorRef = useRef<HTMLDivElement>(null);

  const formFunctions = useForm<TiltakFormValues>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = formFunctions;

  const beskrivelseValue = watch("beskrivelse");

  const startDate = watch("fom");

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
          <FormErrorSummary errors={errors} ref={errorRef} />

          <TextField
            className="mb-8"
            data-testid={TILTAK_OVERSKRIFT_TEXTFIELD}
            label={"Overskrift (obligatorisk)"}
            error={errors.overskrift?.message}
            defaultValue={defaultFormValues?.overskrift}
            maxLength={80}
            {...register("overskrift", {
              required: "Du må gi en overskrift av tiltaket",
              maxLength: 80,
            })}
          />

          <Textarea
            className="mb-8"
            data-testid={TILTAK_BESKRIVELSE_TEXTAREA}
            label={"Beskriv hva som skal skje (obligatorisk)"}
            error={errors.beskrivelse?.message}
            description={
              "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
            }
            maxLength={600}
            {...register("beskrivelse", {
              required: "Du må gi en beskrivelse av tiltaket",
              maxLength: 600,
            })}
            defaultValue={defaultFormValues?.beskrivelse}
            value={beskrivelseValue}
          />

          <Alert className="mb-8" variant={"info"}>
            {arbeidstakerInfoText}
          </Alert>

          <TiltakStartSluttDato
            startDate={startDate}
            defaultValueFom={defaultFormValues?.fom}
            defaultValueTom={defaultFormValues?.tom}
          />

          <Row>
            <Button
              data-testid={TILTAK_LAGRE_BUTTON}
              loading={isSubmitting}
              variant={"primary"}
              type={"submit"}
              onClick={() => {
                errorRef.current && errorRef.current.focus();
              }}
            >
              Lagre
            </Button>
            <Button variant={"tertiary"} onClick={onCancel} type="button">
              Avbryt
            </Button>
          </Row>
        </LightGreyPanel>
      </form>
    </FormProvider>
  );
};
