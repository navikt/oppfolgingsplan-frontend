import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { KANGJENNOMFOERES, TILRETTELEGGING } from "constants/konstanter";
import { LightGreyPanel } from "components/blocks/wrappers/LightGreyPanel";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import Feilmelding from "../blocks/error/Feilmelding";
import { DataTestId } from "../../../cypress/dataTestId";

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

const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 2rem;
`;

const StyledCheckboxGroup = styled(CheckboxGroup)`
  margin-bottom: 2rem;
`;

interface Props {
  onSubmit(data: OppgaveFormValues): void;

  isSubmitting: boolean;

  isErrorSavingOppgave: boolean;

  onCancel(): void;

  defaultFormValues?: OppgaveFormValues;
  navnIsEditable?: boolean;
}

export const ArbeidsoppgaveFormSM = ({
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
    watch,
    resetField,
    formState: { errors },
  } = formFunctions;

  const kanGjennomforesValue = watch("kanGjennomfores");

  const hasSelectedGjennomforesMedTilrettelegging = () => {
    if (!kanGjennomforesValue) {
      return (
        defaultFormValues?.kanGjennomfores == KANGJENNOMFOERES.TILRETTELEGGING
      );
    }
    return kanGjennomforesValue == KANGJENNOMFOERES.TILRETTELEGGING;
  };

  const hasSelectedKanIkke = () => {
    if (!kanGjennomforesValue) {
      return defaultFormValues?.kanGjennomfores == KANGJENNOMFOERES.KAN_IKKE;
    }
    return kanGjennomforesValue == KANGJENNOMFOERES.KAN_IKKE;
  };

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
          {navnIsEditable && (
            <StyledTextarea
              id="beskrivArbeidsoppgavenTextArea"
              data-testid={DataTestId.ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA}
              label={"Navn på arbeidsoppgaven (obligatorisk)"}
              error={errors.navnPaaArbeidsoppgaven?.message}
              description={"Beskriv arbeidsoppgaven med noen få ord"}
              maxLength={100}
              {...register("navnPaaArbeidsoppgaven", {
                required: "Du må gi et navn på oppgaven",
                maxLength: {
                  value: 100,
                  message:
                    "Navnet på arbeidsoppgaven må være på 100 tegn eller mindre",
                },
              })}
              defaultValue={defaultFormValues?.navnPaaArbeidsoppgaven}
            />
          )}

          <Controller
            name="kanGjennomfores"
            rules={{ required: "Du må velge om oppgaven kan gjennomføres" }}
            defaultValue={defaultFormValues?.kanGjennomfores}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <StyledRadioGroup
                legend="Kan oppgaven gjennomføres i sykeperioden? (obligatorisk)"
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e);
                  resetField("kanBeskrivelse");
                  resetField("kanIkkeBeskrivelse");
                  resetField("tilrettelegging");
                }}
                error={errors.kanGjennomfores?.message}
                ref={ref}
                value={value}
              >
                <Radio
                  id="oppgaveKanGjennomfoeresRadio"
                  data-testid={
                    DataTestId.ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO
                  }
                  value={KANGJENNOMFOERES.KAN}
                >
                  Ja, den kan gjennomføres som normalt
                </Radio>
                <Radio
                  id="OppgaveKanGjennomfoeresMedTilretteleggingRadio"
                  data-testid={
                    DataTestId.ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_TILRETTELEGGING_RADIO
                  }
                  value={KANGJENNOMFOERES.TILRETTELEGGING}
                >
                  Ja, den kan gjennomføres med tilrettelegging
                </Radio>
                <Radio
                  id="OppgaveKanIkkeGjennomfoeresRadio"
                  data-testid={
                    DataTestId.ARBEIDSOPPGAVE_KAN_IKKE_GJENNOMFOERES_RADIO
                  }
                  value={KANGJENNOMFOERES.KAN_IKKE}
                >
                  Nei, den kan ikke gjennomføres
                </Radio>
              </StyledRadioGroup>
            )}
          />

          {hasSelectedGjennomforesMedTilrettelegging() && (
            <div>
              <Controller
                name="tilrettelegging"
                defaultValue={defaultFormValues?.tilrettelegging}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <StyledCheckboxGroup
                    legend="Hva skal til for å gjennomføre oppgaven?"
                    onBlur={onBlur}
                    onChange={onChange}
                    error={errors.tilrettelegging?.message}
                    ref={ref}
                    value={value}
                  >
                    <Checkbox value={TILRETTELEGGING.PAA_ANNET_STED}>
                      Arbeide fra et annet sted
                    </Checkbox>
                    <Checkbox value={TILRETTELEGGING.MED_MER_TID}>
                      Mer gitt tid
                    </Checkbox>
                    <Checkbox value={TILRETTELEGGING.MED_HJELP}>
                      Med hjelp/hjelpemidler
                    </Checkbox>
                  </StyledCheckboxGroup>
                )}
              />

              <StyledTextarea
                id="kanBeskrivelse"
                label={"Beskrivelse (obligatorisk)"}
                error={errors.kanBeskrivelse?.message}
                description={
                  "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
                }
                maxLength={1000}
                {...register("kanBeskrivelse", {
                  required:
                    "Du må gi en beskrivelse av hva som skal til for å gjennomføre oppgaven",
                  maxLength: 1000,
                })}
                defaultValue={defaultFormValues?.kanBeskrivelse}
              />
            </div>
          )}

          {hasSelectedKanIkke() && (
            <StyledTextarea
              id="kanIkkeBeskrivelse"
              label={
                "Hva står i veien for å kunne gjennomføre oppgaven? (obligatorisk)"
              }
              error={errors.kanIkkeBeskrivelse?.message}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              {...register("kanIkkeBeskrivelse", {
                required:
                  "Du må gi en beskrivelse av hvorfor du ikke kan gjennomføre oppgaven",
                maxLength: 1000,
              })}
              defaultValue={defaultFormValues?.kanIkkeBeskrivelse}
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
            <Button
              id="lagreArbeidsoppgaveButton"
              data-testid={DataTestId.ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON}
              loading={isSubmitting}
              variant={"primary"}
              type={"submit"}
            >
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
