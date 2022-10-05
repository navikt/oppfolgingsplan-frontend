import { Button, Textarea } from "@navikt/ds-react";
import { LightGreyPanel } from "@/common/components/wrappers/LightGreyPanel";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

export type OppgaveFormValues = {
  navnPaaArbeidsoppgaven: string;
  kanGjennomfores: string;
};

const StyledTextarea = styled(Textarea)`
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
    formState: { errors },
  } = formFunctions;

  const navnValue = watch("navnPaaArbeidsoppgaven");

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
