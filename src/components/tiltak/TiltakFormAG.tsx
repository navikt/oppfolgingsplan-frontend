import {
  Alert,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  TextField,
} from "@navikt/ds-react";
import styled from "styled-components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import React, { useRef } from "react";
import { LightGreyPanel } from "components/blocks/wrappers/LightGreyPanel";
import { FormErrorSummary } from "components/blocks/error/FormErrorSummary";
import { DatoVelger } from "components/blocks/datovelger/DatoVelger";
import { Row } from "../blocks/wrappers/Row";
import { STATUS_TILTAK } from "../../constants/konstanter";
import { TiltakFormValues } from "./utils/typer";

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

const SpacedAlert = styled(Alert)`
  margin-bottom: 2rem;
`;

const arbeidsgiverInfoText =
  "Husk at arbeidstakeren din kan se det du skriver her. Du må ikke gi sensitive personopplysninger.";

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

export const TiltakFormAG = ({
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

  const beskrivelseValue = watch("beskrivelse");
  const statusValue = watch("status");

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

          <SpacedAlert variant={"info"}>{arbeidsgiverInfoText}</SpacedAlert>

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
            <DateRow>
              <DatoVelger
                name="fom"
                label={"Startdato (obligatorisk)"}
                defaultValue={defaultFormValues?.fom}
                errorMessageToDisplay={errors.fom?.message}
                requiredErrorMessage={"Du må velge startdato"}
              />

              <DatoVelger
                name="tom"
                label={"Sluttdato (obligatorisk)"}
                defaultValue={defaultFormValues?.tom}
                errorMessageToDisplay={errors.tom?.message}
                requiredErrorMessage={"Du må velge sluttdato"}
              />
            </DateRow>
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
