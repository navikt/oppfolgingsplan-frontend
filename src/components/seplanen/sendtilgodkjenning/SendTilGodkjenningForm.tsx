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
import styled from "styled-components";
import { DatoVelger } from "components/blocks/datovelger/DatoVelger";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Row } from "components/blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { TvungenGodkjenningToggle } from "./TvungenGodkjenningToggle";
import { notNullish } from "../../../server/utils/tsUtils";
import { useGodkjennOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

const Line = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export type SendTilGodkjenningFormValues = {
  startDato: Date;
  sluttDato: Date;
  evalueresInnen: Date;
  delMedNAV: string;
  enigIPlanen: string | null;
};

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  visTvungenGodkjenningToggle: boolean;

  cancel(): void;
}

export const SendTilGodkjenningForm = ({
  oppfolgingsplan,
  visTvungenGodkjenningToggle,
  cancel,
}: Props): ReactElement => {
  const sendTilGodkjenning = useGodkjennOppfolgingsplan(oppfolgingsplan.id);

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

  const isAfterStartDate = (date: Date) => {
    if (!startDate) return true;

    return date.getTime() > new Date(startDate).getTime();
  };

  const getSluttDatoErrorMessage = (): string | undefined => {
    if (errors.sluttDato?.message) {
      return errors.sluttDato?.message;
    }

    if (errors.sluttDato?.type === "validate") {
      return "Sluttdato må være etter startdato";
    }
  };

  const getEvalueresInnenErrorMessage = (): string | undefined => {
    if (errors.evalueresInnen?.message) {
      return errors.evalueresInnen?.message;
    }

    if (errors.evalueresInnen?.type === "validate") {
      return "Evalueringsdato må være etter startdato";
    }
  };

  return (
    <FormProvider {...formFunctions}>
      <form
        onSubmit={handleSubmit((data: SendTilGodkjenningFormValues) =>
          sendTilGodkjenning.mutate({
            gyldighetstidspunkt: {
              fom: data.startDato.toJSON(),
              tom: data.sluttDato.toJSON(),
              evalueres: data.evalueresInnen.toJSON(),
            },
            tvungenGodkjenning: tvungenGodkjenning ?? false,
            delmednav: data.delMedNAV === "true",
          })
        )}
      >
        <BodyLong spacing>
          Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.
        </BodyLong>

        <Line />

        <Heading spacing size={"small"} level={"3"}>
          Hvor lenge skal planen vare?
        </Heading>

        <BodyLong spacing>
          Vi har foreslått datoer basert på tiltakene dere har skrevet:
        </BodyLong>

        <Row gap={"0"}>
          <DatoVelger
            name="startDato"
            label={"Startdato (obligatorisk)"}
            defaultValue={
              suggestedStartDate ? new Date(suggestedStartDate) : null
            }
            errorMessageToDisplay={errors.startDato?.message}
            requiredErrorMessage={"Du må velge startdato"}
          />

          <DatoVelger
            name="sluttDato"
            label={"Sluttdato (obligatorisk)"}
            defaultValue={suggestedEndDate ? new Date(suggestedEndDate) : null}
            errorMessageToDisplay={getSluttDatoErrorMessage()}
            requiredErrorMessage={"Du må velge sluttdato"}
            validate={isAfterStartDate}
          />
        </Row>

        <DatoVelger
          name="evalueresInnen"
          label={"Evalueres innen (obligatorisk)"}
          errorMessageToDisplay={getEvalueresInnenErrorMessage()}
          requiredErrorMessage={
            "Du må velge frist for når planen skal evalueres"
          }
          validate={isAfterStartDate}
        />

        <Line />

        {visTvungenGodkjenningToggle && (
          <TvungenGodkjenningToggle
            setTvungenGodkjenning={setTvungenGodkjenning}
            tvungenGodkjenning={tvungenGodkjenning}
          />
        )}

        <SpacedDiv>
          <CheckboxGroup legend="Samtykke og deling" hideLegend>
            <Checkbox value={"true"} {...register("delMedNAV")}>
              Jeg vil dele planen med NAV når{" "}
              {oppfolgingsplan.arbeidsgiver?.naermesteLeder?.navn ||
                "lederen min"}{" "}
              har godkjent den (valgfritt)
            </Checkbox>
            <Checkbox
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
            <ErrorMessage>{errors.enigIPlanen?.message}</ErrorMessage>
          )}
        </SpacedDiv>

        <Row>
          <Button type={"submit"} loading={sendTilGodkjenning.isLoading}>
            Send til godkjenning
          </Button>
          <Button variant={"tertiary"} onClick={cancel}>
            Avbryt
          </Button>
        </Row>
      </form>
    </FormProvider>
  );
};
