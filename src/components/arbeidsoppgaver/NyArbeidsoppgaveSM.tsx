import {
  ArbeidsoppgaveFormSM,
  OppgaveFormValues,
} from "./ArbeidsoppgaveFormSM";
import { ArbeidsoppgaveFormHeadingSM } from "./ArbeidsoppgaveFormHeading";
import { TILRETTELEGGING } from "constants/konstanter";
import { Button } from "@navikt/ds-react";
import React, { useState } from "react";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";
import { useLagreArbeidsoppgave } from "../../api/queries/oppfolgingsplan/arbeidsoppgaveQueries";

export const NyArbeidsoppgaveSM = () => {
  const lagreOppgave = useLagreArbeidsoppgave();
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

  const nyArbeidsoppgaveInformasjon = (
    data: OppgaveFormValues
  ): Partial<Arbeidsoppgave> => {
    return {
      arbeidsoppgavenavn: data.navnPaaArbeidsoppgaven,
      gjennomfoering: {
        kanGjennomfoeres: data.kanGjennomfores,
        paaAnnetSted: data.tilrettelegging
          ? data.tilrettelegging.includes(TILRETTELEGGING.PAA_ANNET_STED)
          : false,
        medMerTid: data.tilrettelegging
          ? data.tilrettelegging.includes(TILRETTELEGGING.MED_MER_TID)
          : false,
        medHjelp: data.tilrettelegging
          ? data.tilrettelegging.includes(TILRETTELEGGING.MED_HJELP)
          : false,
        kanBeskrivelse: data.kanBeskrivelse,
        kanIkkeBeskrivelse: data.kanIkkeBeskrivelse,
      },
    };
  };

  if (!leggerTilOppgave) {
    return (
      <SpacedPanel border={true}>
        <ArbeidsoppgaveFormHeadingSM />
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
      <ArbeidsoppgaveFormHeadingSM />
      <ArbeidsoppgaveFormSM
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
