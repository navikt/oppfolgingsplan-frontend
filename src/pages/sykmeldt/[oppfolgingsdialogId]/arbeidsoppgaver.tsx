import { NextPage } from "next";
import React, { useState } from "react";
import {
  useOppfolgingsplanerSM,
  useOppfolgingsplanSM,
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useOppfolgingsplanRouteId } from "@/common/hooks/routeHooks";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { BodyLong, Button, Heading, Textarea } from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import { SpacedPanel } from "@/common/components/wrappers/SpacedPanel";
import { LightGreyPanel } from "@/common/components/wrappers/LightGreyPanel";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {ButtonRow} from "@/common/components/wrappers/ButtonRow";

const StyledTextarea = styled(Textarea)`
  margin-bottom: 2rem;
`;

export type OppgaveFormValues = {
    navn: string;
    kanGjennomfores: string;
};

const Arbeidsoppgaver: NextPage = () => {
  const oppfolgingsdialogId = useOppfolgingsplanRouteId();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<OppgaveFormValues>();

    const navnValue = watch("navn");

    return (
    <OppfolgingsplanPageSM
      isLoading={oppfolgingsplaner.isLoading}
      isError={oppfolgingsplaner.isError}
      oppfolgingsplan={aktivPlan}
      page={Page.ARBEIDSOPPGAVER}
    >
      {aktivPlan && (
        <form onSubmit={handleSubmit((formData) => console.log(formData))}>
          <SpacedPanel border={true}>
            <>
              <Heading spacing size="medium" level="3">
                Beskriv en arbeidsoppgave
              </Heading>
              <BodyLong spacing size="medium">
                Legg til én arbeidsoppgave per type oppgave du utfører i din
                stilling, slik at dere kan vurdere hver oppgave separat.
              </BodyLong>
            </>

            {!leggerTilOppgave && (
              <Button
                variant={"secondary"}
                icon={<PlusIcon />}
                onClick={() => setLeggerTilOppgave(true)}
              >
                Legg til ny arbeidsoppgave
              </Button>
            )}

            {leggerTilOppgave && (
              <LightGreyPanel border={true}>
                <StyledTextarea
                  id="beskrivArbeidsoppgaven"
                  label={"Navn på arbeidsoppgaven (obligatorisk)"}
                  error={errors.navn?.message}
                  description={"Beskriv arbeidsoppgaven med noen få ord"}
                  maxLength={100}
                  {...register("navn", {
                    required: "Du må gi et navn på oppgaven",
                    maxLength: 100,
                  })}
                  // defaultValue={defaultFormValues?.beskrivelse}
                  // value={navnValue}
                />

                  <ButtonRow>
                      <Button
                          variant={"primary"}
                          type={"submit"}
                      >
                          Lagre
                      </Button>
                      <Button variant={"tertiary"} onClick={() => setLeggerTilOppgave(false)}>
                          Avbryt
                      </Button>
                  </ButtonRow>
              </LightGreyPanel>
            )}
          </SpacedPanel>
        </form>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Arbeidsoppgaver;
