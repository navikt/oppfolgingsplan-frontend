import {
  BodyLong,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  Heading,
} from "@navikt/ds-react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactElement, useState } from "react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { Row } from "../../blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { TvungenGodkjenningToggle } from "./TvungenGodkjenningToggle";
import { notNullish } from "../../../server/utils/tsUtils";
import Datepicker from "../../blocks/datepicker/Datepicker";
import { toDate } from "../../../utils/dateUtils";
import {
  SEPLANEN_ENIG_I_PLANEN_CHECKBOX,
  SEPLANEN_EVALUERES_INNEN,
  SEPLANEN_SEND_TIL_GODKJENNING_BUTTON,
  SEPLANEN_SLUTTDATO,
  SEPLANEN_STARTDATO,
} from "../../../../cypress/dataTestId";

export type SendTilGodkjenningFormValues = {
  startDato: Date;
  sluttDato: Date;
  evalueresInnen: Date;
  delMedNAV: string;
  enigIPlanen: string | null;
  tvungenGodkjenning: boolean;
};

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  isOwnLeder?: boolean;
  visTvungenGodkjenningToggle: boolean;
  navnPaaMotpart: string;
  sendTilGodkjenning: (values: SendTilGodkjenningFormValues) => void;
  isSubmitting: boolean;
  cancel(): void;
}

export const SendTilGodkjenningForm = ({
  oppfolgingsplan,
  isOwnLeder = false,
  visTvungenGodkjenningToggle,
  navnPaaMotpart,
  sendTilGodkjenning,
  isSubmitting,
  cancel,
}: Props): ReactElement => {
  const [tvungenGodkjenning, setTvungenGodkjenning] = useState(false);
  const formFunctions = useForm<SendTilGodkjenningFormValues>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = formFunctions;

  const suggestedStartDate: string | null = oppfolgingsplan.tiltakListe
    .map((tiltak) => tiltak.fom)
    .filter(notNullish)
    .sort((t1: string, t2: string) => {
      return new Date(t1).getTime() - new Date(t2).getTime();
    })[0];

  const suggestedEndDate: string | null = oppfolgingsplan.tiltakListe
    .map((tiltak) => tiltak.tom)
    .filter(notNullish)
    .sort((t1: string, t2: string) => {
      return new Date(t2).getTime() - new Date(t1).getTime();
    })[0];

  const startDate = watch("startDato");
  const sluttDate = watch("sluttDato");

  const onSubmit = (data: SendTilGodkjenningFormValues) => {
    data.tvungenGodkjenning = tvungenGodkjenning;
    sendTilGodkjenning(data);
  };

  return (
    <FormProvider {...formFunctions}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BodyLong spacing>
          Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.
        </BodyLong>

        <hr className="my-4" />

        <Heading spacing size={"small"} level={"3"}>
          Hvor lenge skal planen vare?
        </Heading>

        <BodyLong spacing>
          Vi har foreslått datoer basert på tiltakene dere har skrevet:
        </BodyLong>

        <Row gap={"2rem"} marginBottom={"2rem"}>
          <Datepicker
            testid={SEPLANEN_STARTDATO}
            name="startDato"
            label="Startdato (obligatorisk)"
            defaultValue={
              suggestedStartDate ? new Date(suggestedStartDate) : null
            }
            validate={(value: Date | undefined) => {
              if (!value) {
                return "Du må velge startdato";
              }
            }}
          />

          <Datepicker
            testid={SEPLANEN_SLUTTDATO}
            name="sluttDato"
            label={"Sluttdato (obligatorisk)"}
            defaultValue={suggestedEndDate ? new Date(suggestedEndDate) : null}
            validate={(value: Date | undefined) => {
              if (!value) {
                return "Du må velge sluttdato";
              }

              if (startDate && value.getTime() < toDate(startDate).getTime()) {
                return "Sluttdato må være etter startdato";
              }
            }}
          />
        </Row>

        <Datepicker
          testid={SEPLANEN_EVALUERES_INNEN}
          name="evalueresInnen"
          label={"Evalueres innen (obligatorisk)"}
          validate={(value: Date | undefined) => {
            if (!value) {
              return "Du må velge frist for når planen skal evalueres";
            }

            if (startDate && value.getTime() < toDate(startDate).getTime()) {
              return "Evalueringsdato må være etter startdato";
            }

            if (sluttDate && value.getTime() > toDate(sluttDate).getTime()) {
              return "Evalueringsdato må være før sluttdato";
            }
          }}
        />

        <hr className="my-4" />

        <div {...register("tvungenGodkjenning")} />

        {visTvungenGodkjenningToggle && (
          <TvungenGodkjenningToggle
            setTvungenGodkjenning={setTvungenGodkjenning}
            tvungenGodkjenning={tvungenGodkjenning}
          />
        )}

        <SpacedDiv>
          <CheckboxGroup legend="Samtykke og deling" hideLegend>
            <Checkbox value={"true"} {...register("delMedNAV")}>
              Jeg vil dele planen med NAV når {navnPaaMotpart} har godkjent den
              (valgfritt)
            </Checkbox>
            <Checkbox
              data-testid={SEPLANEN_ENIG_I_PLANEN_CHECKBOX}
              value={"true"}
              {...register("enigIPlanen", {
                required: "Du må godkjenne planen for å komme videre",
              })}
              error={!!errors.enigIPlanen}
            >
              Jeg er enig i denne oppfølgingsplanen (obligatorisk)
            </Checkbox>
          </CheckboxGroup>
          {errors.enigIPlanen?.message && (
            <ErrorMessage>{errors.enigIPlanen.message}</ErrorMessage>
          )}
        </SpacedDiv>

        <Row>
          <Button
            data-testid={SEPLANEN_SEND_TIL_GODKJENNING_BUTTON}
            type={"submit"}
            loading={isSubmitting}
          >
            {isOwnLeder ? "Opprett plan" : "Send til godkjenning"}
          </Button>
          <Button variant={"tertiary"} onClick={cancel}>
            Avbryt
          </Button>
        </Row>
      </form>
    </FormProvider>
  );
};
