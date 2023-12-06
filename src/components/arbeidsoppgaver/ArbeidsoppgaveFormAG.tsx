import { Button, Textarea } from "@navikt/ds-react";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { LightGreyPanel } from "../blocks/wrappers/LightGreyPanel";
import { Row } from "../blocks/wrappers/Row";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import Feilmelding from "../blocks/error/Feilmelding";

export type OppgaveFormValues = {
  arbeidsoppgaveNavn: string;
};

interface Props {
  onSubmit(data: OppgaveFormValues): void;

  isSubmitting: boolean;

  isErrorSavingOppgave: boolean;

  onCancel(): void;

  defaultFormValues?: OppgaveFormValues;
  navnIsEditable?: boolean;
}

export const ArbeidsoppgaveFormAG = ({
  onSubmit,
  isSubmitting,
  isErrorSavingOppgave,
  onCancel,
  defaultFormValues,
  navnIsEditable = true,
}: Props) => {
  const formFunctions = useForm<OppgaveFormValues>({
    defaultValues: defaultFormValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = formFunctions;

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
          {navnIsEditable && (
            <Controller
              name="arbeidsoppgaveNavn"
              render={({ field }) => (
                <Textarea
                  className="mb-4"
                  {...field}
                  label={"Navn på arbeidsoppgaven (obligatorisk)"}
                  error={errors.arbeidsoppgaveNavn?.message}
                  description={"Beskriv arbeidsoppgaven med noen få ord"}
                  maxLength={100}
                />
              )}
              rules={{
                required: "Du må gi et navn på oppgaven",
                maxLength: {
                  value: 100,
                  message:
                    "Navnet på arbeidsoppgaven må være på 100 tegn eller mindre",
                },
              }}
            />
          )}

          {isErrorSavingOppgave && (
            <SpacedDiv>
              <Feilmelding
                description={
                  "Vi klarte ikke å lagre endringene på arbeidsoppgaven din. Vennligst prøv igjen senere."
                }
              />
            </SpacedDiv>
          )}

          <Row>
            <Button loading={isSubmitting} variant={"primary"} type={"submit"}>
              Lagre
            </Button>
            <Button variant={"tertiary"} onClick={onCancel}>
              Avbryt
            </Button>
          </Row>
        </LightGreyPanel>
      </form>
    </FormProvider>
  );
};
