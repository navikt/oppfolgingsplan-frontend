import {
  BodyLong,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  Heading,
} from "@navikt/ds-react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Row } from "components/blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { notNullish } from "../../../server/utils/tsUtils";
import { useGodkjennEgenOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import Datepicker from "../../blocks/datepicker/Datepicker";
import { formatAsLocalDateTime, toDate } from "../../../utils/dateUtils";

const Line = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export type GodkjennEgenPlanFormValues = {
  startDato: Date;
  sluttDato: Date;
  evalueresInnen: Date;
  delMedNAV: string;
  enigIPlanen: string | null;
};

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  cancel(): void;
}

export const GodkjennEgenPlanAGForm = ({
  oppfolgingsplan,
  cancel,
}: Props): ReactElement => {
  const godkjennEgenPlan = useGodkjennEgenOppfolgingsplan(oppfolgingsplan.id);

  const formFunctions = useForm<GodkjennEgenPlanFormValues>();
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

  return (
    <FormProvider {...formFunctions}>
      <form
        onSubmit={handleSubmit((data: GodkjennEgenPlanFormValues) =>
          godkjennEgenPlan.mutate({
            gyldighetstidspunkt: {
              fom: formatAsLocalDateTime(data.startDato),
              tom: formatAsLocalDateTime(data.sluttDato),
              evalueres: formatAsLocalDateTime(data.evalueresInnen),
            },
            delmednav: data.delMedNAV === "true",
          })
        )}
      >
        <Line />

        <Heading spacing size={"small"} level={"3"}>
          Hvor lenge skal planen vare?
        </Heading>

        <BodyLong spacing>
          Vi har foreslått datoer basert på tiltakene dere har skrevet:
        </BodyLong>

        <Row gap={"2rem"} marginBottom={"2rem"}>
          <Datepicker
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
          name="evalueresInnen"
          label={"Evalueres innen (obligatorisk)"}
          validate={(value: Date | undefined) => {
            if (!value) {
              return "Du må velge frist for når planen skal evalueres";
            }

            if (startDate && value.getTime() < toDate(startDate).getTime()) {
              return "Evalueringsdato må være etter startdato";
            }
          }}
        />

        <Line />

        <SpacedDiv>
          <CheckboxGroup legend="Samtykke og deling" hideLegend>
            <Checkbox value={"true"} {...register("delMedNAV")}>
              Jeg vil dele planen med NAV når jeg har godkjent den (valgfritt)
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
            <ErrorMessage>{errors.enigIPlanen.message}</ErrorMessage>
          )}
        </SpacedDiv>

        <Row>
          <Button type={"submit"} loading={godkjennEgenPlan.isLoading}>
            Opprett plan
          </Button>
          <Button variant={"tertiary"} onClick={cancel}>
            Avbryt
          </Button>
        </Row>
      </form>
    </FormProvider>
  );
};
