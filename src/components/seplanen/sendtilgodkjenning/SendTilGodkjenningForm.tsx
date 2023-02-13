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
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Row } from "components/blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { TvungenGodkjenningToggle } from "./TvungenGodkjenningToggle";
import { notNullish } from "../../../server/utils/tsUtils";
import { useGodkjennOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import Datepicker from "../../blocks/datepicker/Datepicker";
import { formatAsLocalDateTime, toDate } from "../../../utils/dateUtils";

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
  isOwnLeader?: boolean;
  cancel(): void;
}

export const SendTilGodkjenningForm = ({
  oppfolgingsplan,
  visTvungenGodkjenningToggle,
  isOwnLeader,
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

  return (
    <FormProvider {...formFunctions}>
      <form
        onSubmit={handleSubmit((data: SendTilGodkjenningFormValues) =>
          sendTilGodkjenning.mutate({
            gyldighetstidspunkt: {
              fom: formatAsLocalDateTime(data.startDato),
              tom: formatAsLocalDateTime(data.sluttDato),
              evalueres: formatAsLocalDateTime(data.evalueresInnen),
            },
            //TODO: check what SM will see when tvungenGodkjenning is false
            tvungenGodkjenning: isOwnLeader ? false : tvungenGodkjenning,
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
            <ErrorMessage>{errors.enigIPlanen.message}</ErrorMessage>
          )}
        </SpacedDiv>

        <Row>
          {!isOwnLeader && (
            <Button type={"submit"} loading={sendTilGodkjenning.isLoading}>
              Send til godkjenning
            </Button>
          )}
          {isOwnLeader && (
            <Button type={"submit"} loading={sendTilGodkjenning.isLoading}>
              Opprett plan
            </Button>
          )}
          <Button variant={"tertiary"} onClick={cancel}>
            Avbryt
          </Button>
        </Row>
      </form>
    </FormProvider>
  );
};
