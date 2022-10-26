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
import { Oppfolgingsplan, Tiltak } from "../../../schema/oppfolgingsplanSchema";
import { useGodkjennOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import styled from "styled-components";
import { DatoVelger } from "components/blocks/datovelger/DatoVelger";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { LightGreyPanel } from "components/blocks/wrappers/LightGreyPanel";
import { Row } from "components/blocks/wrappers/Row";

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

  cancel(): void;
}

export const SendTilGodkjenningForm = ({
  oppfolgingsplan,
  cancel,
}: Props): ReactElement => {
  const sendTilGodkjenning = useGodkjennOppfolgingsplanSM(oppfolgingsplan.id);

  const formFunctions = useForm<SendTilGodkjenningFormValues>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = formFunctions;

  const suggestedStartDate = oppfolgingsplan.tiltakListe
    ?.filter((tiltak) => tiltak.fom)
    .sort((t1: Tiltak, t2: Tiltak) => {
      return new Date(t1.fom!!).getTime() - new Date(t2.fom!!).getTime();
    })[0]?.fom;

  const suggestedEndDate = oppfolgingsplan.tiltakListe
    ?.filter((tiltak) => tiltak.tom)
    .sort((t1: Tiltak, t2: Tiltak) => {
      return new Date(t2.tom!!).getTime() - new Date(t1.tom!!).getTime();
    })[0]?.tom;

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
            delmednav: data.delMedNAV === "true",
          })
        )}
      >
        <LightGreyPanel border>
          <Heading spacing size={"medium"} level={"2"}>
            Send til lederen din for godkjenning
          </Heading>

          <BodyLong spacing>
            Når du har sendt planen, kan lederen din enten godkjenne den, eller
            gjøre endringer og sende den tilbake til deg for ny godkjenning.
          </BodyLong>

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
              defaultValue={new Date(suggestedStartDate!!)}
              errorMessageToDisplay={errors.startDato?.message}
              requiredErrorMessage={"Du må velge startdato"}
            />

            <DatoVelger
              name="sluttDato"
              label={"Sluttdato (obligatorisk)"}
              defaultValue={
                suggestedEndDate ? new Date(suggestedEndDate) : null
              }
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
            <Button type={"submit"}>Send til godkjenning</Button>
            <Button variant={"tertiary"} onClick={cancel}>
              Avbryt
            </Button>
          </Row>
        </LightGreyPanel>
      </form>
    </FormProvider>
  );
};
