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
import { BodyLong, Button, Heading } from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import { SpacedPanel } from "@/common/components/wrappers/SpacedPanel";
import { useForm } from "react-hook-form";
import {
  ArbeidsoppgaveForm,
  OppgaveFormValues,
} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveForm";

const Arbeidsoppgaver: NextPage = () => {
  const oppfolgingsdialogId = useOppfolgingsplanRouteId();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

  const { handleSubmit } = useForm<OppgaveFormValues>();

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
              <ArbeidsoppgaveForm
                onSubmit={(data) => {
                  // lagreOppgave.mutate({
                  //     oppfolgingsplanId: oppfolgingsplanId,
                  //     oppgave: toOppgave(data),
                  // });
                  console.log(data);
                  setLeggerTilOppgave(false);
                }}
                onCancel={() => setLeggerTilOppgave(false)}
              />
            )}
          </SpacedPanel>
        </form>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Arbeidsoppgaver;
