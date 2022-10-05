import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import { LightGreyPanel } from "@/common/components/wrappers/LightGreyPanel";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { KANGJENNOMFOERES, TILRETTELEGGING } from "@/common/konstanter";

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

  onCancel(): void;

  defaultFormValues?: OppgaveFormValues;
}

export const ArbeidsoppgaveForm = ({
  onSubmit,
  onCancel,
  defaultFormValues,
}: Props) => {
  const formFunctions = useForm<OppgaveFormValues>();
  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors },
  } = formFunctions;

  const navnValue = watch("navnPaaArbeidsoppgaven");
  const kanBeskrivelseValue = watch("kanBeskrivelse");
  const kanGjennomforesValue = watch("kanGjennomfores");

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
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
            value={navnValue}
          />

          <Controller
            name="kanGjennomfores"
            rules={{ required: "Du må velge om oppgaven kan gjennomføres" }}
            defaultValue={null}
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
                ref={ref}
                value={value}
              >
                <Radio value={KANGJENNOMFOERES.KAN}>
                  Ja, den kan gjennomføres som normalt
                </Radio>
                <Radio value={KANGJENNOMFOERES.TILRETTELEGGING}>
                  Ja, den kan gjennomføres med tilrettelegging
                </Radio>
                <Radio value={KANGJENNOMFOERES.KAN_IKKE}>
                  Nei, den kan ikke gjennomføres
                </Radio>
              </StyledRadioGroup>
            )}
          />

          {kanGjennomforesValue == KANGJENNOMFOERES.TILRETTELEGGING && (
            <div>
              <Controller
                name="tilrettelegging"
                rules={{
                  required:
                    "Du må velge hva som skal til for å gjennomføre oppgaven",
                }}
                defaultValue={null}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <StyledCheckboxGroup
                    legend="Hva skal til for å gjennomføre oppgaven? (obligatorisk)"
                    onBlur={onBlur}
                    onChange={onChange}
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
                value={kanBeskrivelseValue}
              />
            </div>
          )}

          {kanGjennomforesValue == KANGJENNOMFOERES.KAN_IKKE && (
            <div>kan ikke todo</div>
          )}

          <ButtonRow>
            <Button variant={"primary"} type={"submit"}>
              Lagre
            </Button>
            <Button variant={"tertiary"} onClick={onCancel}>
              Avbryt
            </Button>
          </ButtonRow>
        </LightGreyPanel>
      </form>
    </FormProvider>
  );
};
