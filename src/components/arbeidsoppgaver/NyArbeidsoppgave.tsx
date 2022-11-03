import { useLagreArbeidsoppgaveSM } from "api/queries/sykmeldt/oppgaveQueriesSM";
import { ArbeidsoppgaveForm, OppgaveFormValues } from "./ArbeidsoppgaveForm";
import { ArbeidsoppgaveFormHeading } from "./ArbeidsoppgaveFormHeading";
import { TILRETTELEGGING } from "constants/konstanter";
import { Button } from "@navikt/ds-react";
import React, { useState } from "react";
import { Arbeidsoppgave } from "../../schema/oppfolgingsplanSchema";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";

export const NyArbeidsoppgave = () => {
  const lagreOppgave = useLagreArbeidsoppgaveSM();
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
      <ArbeidsoppgaveForm
        onSubmit={(data) => {
          lagreOppgave.mutate(nyArbeidsoppgaveInformasjon(data));
          if (lagreOppgave.isSuccess) {
            setLeggerTilOppgave(false);
          }
        }}
        isSubmitting={lagreOppgave.isLoading}
        isErrorSavingOppgave={lagreOppgave.isError}
        onCancel={() => setLeggerTilOppgave(false)}
      />
    </SpacedPanel>
  );
};
