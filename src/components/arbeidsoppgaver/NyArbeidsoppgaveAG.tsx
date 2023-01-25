import { ArbeidsoppgaveFormHeading } from "./ArbeidsoppgaveFormHeading";
import { Button } from "@navikt/ds-react";
import React, { useState } from "react";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";
import {
  ArbeidsoppgaveFormAG,
  OppgaveFormValues,
} from "./ArbeidsoppgaveFormAG";
import { useLagreArbeidsoppgave } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";

export const NyArbeidsoppgaveAG = () => {
  const lagreOppgave = useLagreArbeidsoppgave();
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

  const nyArbeidsoppgaveInformasjon = (
    data: OppgaveFormValues
  ): Partial<Arbeidsoppgave> => {
    return {
      arbeidsoppgavenavn: data.navnPaaArbeidsoppgaven,
      gjennomfoering: {
        kanGjennomfoeres: "KAN",
        paaAnnetSted: false,
        medMerTid: false,
        medHjelp: false,
        kanBeskrivelse: "",
        kanIkkeBeskrivelse: "",
      },
    };
  };

  if (!leggerTilOppgave) {
    return (
      <SpacedPanel border={true}>
        <ArbeidsoppgaveFormHeading />
        <Button
          variant={"secondary"}
          icon={<PlusIcon />}
          onClick={() => setLeggerTilOppgave(true)}
        >
          Legg til ny arbeidsoppgave
        </Button>
      </SpacedPanel>
    );
  }

  return (
    <SpacedPanel border={true}>
      <ArbeidsoppgaveFormHeading />
      <ArbeidsoppgaveFormAG
        onSubmit={(data) => {
          lagreOppgave
            .mutateAsync(nyArbeidsoppgaveInformasjon(data))
            .then(() => {
              setLeggerTilOppgave(false);
            });
        }}
        isSubmitting={lagreOppgave.isLoading}
        isErrorSavingOppgave={lagreOppgave.isError}
        onCancel={() => setLeggerTilOppgave(false)}
      />
    </SpacedPanel>
  );
};
