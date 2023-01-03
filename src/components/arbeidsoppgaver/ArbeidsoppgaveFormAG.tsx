import { Button, Textarea } from "@navikt/ds-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { LightGreyPanel } from "components/blocks/wrappers/LightGreyPanel";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import Feilmelding from "../blocks/error/Feilmelding";

export type OppgaveFormValues = {
  navnPaaArbeidsoppgaven: string;
  kanGjennomfores: string;
  tilrettelegging: string[];
  kanBeskrivelse: string;
  kanIkkeBeskrivelse: string;
};

const StyledTextarea = styled(Textarea)`
  margin-bottom: 2rem;
`;

interface Props {
  onSubmit(data: OppgaveFormValues): void;

  isSubmitting: boolean;

  isErrorSavingOppgave: boolean;

  onCancel(): void;

  defaultFormValues?: OppgaveFormValues;
  navnIsEditable?: Boolean;
}

export const ArbeidsoppgaveFormAG = ({
  onSubmit,
  isSubmitting,
  isErrorSavingOppgave,
  onCancel,
  defaultFormValues,
  navnIsEditable = true,
}: Props) => {
  const formFunctions = useForm<OppgaveFormValues>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formFunctions;

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
          {navnIsEditable && (
            <StyledTextarea
              id="beskrivArbeidsoppgaven"
              label={"Navn på arbeidsoppgaven (obligatorisk)"}
              error={errors.navnPaaArbeidsoppgaven?.message}
              description={"Beskriv arbeidsoppgaven med noen få ord"}
              maxLength={100}
              {...register("navnPaaArbeidsoppgaven", {
                required: "Du må gi et navn på oppgaven",
                maxLength: 100,
              })}
              defaultValue={defaultFormValues?.navnPaaArbeidsoppgaven}
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
