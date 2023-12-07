import {
  Alert,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  TextField,
} from "@navikt/ds-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import React, { useRef } from "react";
import { LightGreyPanel } from "../blocks/wrappers/LightGreyPanel";
import { FormErrorSummary } from "../blocks/error/FormErrorSummary";
import { Row } from "../blocks/wrappers/Row";
import { STATUS_TILTAK } from "../../constants/konstanter";
import { TiltakFormValues } from "./utils/typer";
import { TiltakStartSluttDato } from "./TiltakStartSluttDato";
import {
  TILTAK_BESKRIVELSE_TEXTAREA,
  TILTAK_LAGRE_BUTTON,
  TILTAK_OVERSKRIFT_TEXTFIELD,
} from "../../../cypress/dataTestId";

const arbeidsgiverInfoText =
  "Husk at arbeidstakeren din kan se det du skriver her. Du må ikke gi sensitive personopplysninger.";

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
  const formFunctions = useForm<TiltakFormValues>({
    defaultValues: defaultFormValues,
  });
  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors },
  } = formFunctions;

  const beskrivelseValue = watch("beskrivelse");
  const gjennomfoeringValue = watch("gjennomfoering");
  const beskrivelseIkkeAktueltValue = watch("beskrivelseIkkeAktuelt");
  const statusValue = watch("status");
  const startDate = watch("fom");
  const beskrivelseMaxLength = 1000;

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

          <TextField
            className="mb-8"
            data-testid={TILTAK_OVERSKRIFT_TEXTFIELD}
            label={"Overskrift (obligatorisk)"}
            error={errors.overskrift?.message}
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
            maxLength={beskrivelseMaxLength}
            {...register("beskrivelse", {
              required: "Du må gi en beskrivelse av tiltaket",
              maxLength: {
                value: beskrivelseMaxLength,
                message: `Beskrivelse må være på ${beskrivelseMaxLength} tegn eller mindre`,
              },
            })}
            value={beskrivelseValue}
          />

          <Alert className="mb-8" variant={"info"}>
            {arbeidsgiverInfoText}
          </Alert>

          <Controller
            name="status"
            rules={{ required: "Du må oppgi din vurdering" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <RadioGroup
                className="mb-8"
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
              </RadioGroup>
            )}
          />

          {hasSelectedAvtalt() && (
            <Textarea
              id="gjennomfoering"
              className="mb-8"
              label={"Hvordan skal dette følges opp underveis? (obligatorisk)"}
              error={errors.gjennomfoering?.message}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              maxLength={1000}
              {...register("gjennomfoering", {
                required:
                  "Du må gi en beskrivelse av hvordan skal dette følges opp underveis",
                maxLength: {
                  value: 10000,
                  message: "Beskrivelse må være på 1000 tegn eller mindre",
                },
              })}
              value={gjennomfoeringValue}
            />
          )}

          {hasSelectedIkkeAktuelt() && (
            <Textarea
              id="beskrivelseIkkeAktuelt"
              className="mb-8"
              label={
                "Beskriv hvorfor tiltaket ikke er aktuelt akkurat nå (obligatorisk)"
              }
              error={errors.beskrivelseIkkeAktuelt?.message}
              description={
                "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
              }
              maxLength={1000}
              {...register("beskrivelseIkkeAktuelt", {
                required:
                  "Du må gi en beskrivelse av hvorfor tiltaket ikke er aktuelt akkurat nå",
                maxLength: {
                  value: 10000,
                  message: "Beskrivelse må være på 1000 tegn eller mindre",
                },
              })}
              value={beskrivelseIkkeAktueltValue}
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
