import {
  BodyLong,
  Button,
  Label,
  Radio,
  RadioGroup,
  Textarea,
} from "@navikt/ds-react";
import styled from "styled-components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import React, { useRef } from "react";
import { LightGreyPanel } from "components/blocks/wrappers/LightGreyPanel";
import { FormErrorSummary } from "components/blocks/error/FormErrorSummary";
import { Row } from "../blocks/wrappers/Row";
import { STATUS_TILTAK } from "../../constants/konstanter";
import { TiltakFormValues } from "./utils/typer";
import { TiltakStartSluttDato } from "./TiltakStartSluttDato";

const StyledTextarea = styled(Textarea)`
  margin-bottom: 2rem;
`;

const StyledRadioGroup = styled(RadioGroup)`
  margin-bottom: 2rem;
`;

interface Props {
  isSubmitting: boolean;

  onSubmit(data: TiltakFormValues): void;

  onCancel(): void;

  defaultFormValues?: TiltakFormValues;
}

export const VurderTiltakForm = ({
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
    resetField,
    formState: { errors },
  } = formFunctions;

  const statusValue = watch("status");
  const startDate = watch("fom");

  const hasSelectedIkkeAktuelt = () => {
    if (!statusValue) {
      return defaultFormValues?.status == STATUS_TILTAK.IKKE_AKTUELT;
    }
    return statusValue == STATUS_TILTAK.IKKE_AKTUELT;
  };

  const hasSelectedAvtalt = () => {
    if (!statusValue) {
      return defaultFormValues?.status == STATUS_TILTAK.AVTALT;
    }
    return statusValue == STATUS_TILTAK.AVTALT;
  };

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LightGreyPanel border={true}>
          <FormErrorSummary errors={errors} ref={errorRef} />

          <Label>Beskrivelse</Label>
          <BodyLong spacing={true}>{defaultFormValues?.beskrivelse}</BodyLong>

          <Controller
            name="status"
            rules={{ required: "Du må oppgi din vurdering" }}
            defaultValue={defaultFormValues?.status}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <StyledRadioGroup
                legend="Din vurdering (obligatorisk)"
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e);
                  resetField("gjennomfoering");
                  resetField("beskrivelseIkkeAktuelt");
                }}
                error={errors.status?.message}
                ref={ref}
                value={value}
              >
                <Radio value={STATUS_TILTAK.FORSLAG}>Forslag</Radio>
                <Radio value={STATUS_TILTAK.AVTALT}>Avtalt</Radio>
                <Radio value={STATUS_TILTAK.IKKE_AKTUELT}>Ikke aktuelt</Radio>
              </StyledRadioGroup>
            )}
          />

          {hasSelectedAvtalt() && (
            <StyledTextarea
              id="gjennomfoering"
              label={"Hvordan skal dette følges opp underveis? (obligatorisk)"}
              error={errors.gjennomfoering?.message}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              {...register("gjennomfoering", {
                required:
                  "Du må gi en beskrivelse av hvordan skal dette følges opp underveis",
                maxLength: 1000,
              })}
              defaultValue={defaultFormValues?.gjennomfoering}
            />
          )}

          {hasSelectedIkkeAktuelt() && (
            <StyledTextarea
              id="beskrivelseIkkeAktuelt"
              label={
                "Beskriv hvorfor tiltaket ikke er aktuelt akkurat nå (obligatorisk)"
              }
              error={errors.beskrivelseIkkeAktuelt?.message}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              {...register("beskrivelseIkkeAktuelt", {
                required:
                  "Du må gi en beskrivelse av hvorfor tiltaket ikke er aktuelt akkurat nå",
                maxLength: 1000,
              })}
              defaultValue={defaultFormValues?.beskrivelseIkkeAktuelt}
            />
          )}

          {!hasSelectedIkkeAktuelt() && (
            <TiltakStartSluttDato
              startDate={startDate}
              defaultValueFom={defaultFormValues?.fom}
              defaultValueTom={defaultFormValues?.tom}
            />
          )}

          <Row>
            <Button
              loading={isSubmitting}
              variant={"primary"}
              type={"submit"}
              onClick={() => {
                errorRef.current && errorRef.current.focus();
              }}
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
