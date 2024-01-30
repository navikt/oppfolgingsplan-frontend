import { ArbeidsoppgaveFormHeadingAG } from "./ArbeidsoppgaveFormHeading";
import { Button } from "@navikt/ds-react";
import React, { useState } from "react";
import { SpacedPanel } from "../blocks/wrappers/SpacedPanel";
import PlusIcon from "../../components/blocks/icons/PlusIcon";
import {
  ArbeidsoppgaveFormAG,
  OppgaveFormValues,
} from "./ArbeidsoppgaveFormAG";
import { useLagreArbeidsoppgave } from "../../api/queries/oppfolgingsplan/arbeidsoppgaveQueries";
import { ArbeidsOppgaveDTO } from "../../schema/oppfolgingsplanSchema";

export const NyArbeidsoppgaveAG = () => {
  const lagreOppgave = useLagreArbeidsoppgave();
  const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

  const nyArbeidsoppgaveInformasjon = (
    data: OppgaveFormValues,
  ): Partial<ArbeidsOppgaveDTO> => {
    return {
      arbeidsoppgavenavn: data.arbeidsoppgaveNavn,
      gjennomfoering: {
        kanGjennomfoeres: "IKKE_VURDERT",
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
        <ArbeidsoppgaveFormHeadingAG />
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
      <ArbeidsoppgaveFormHeadingAG />
      <ArbeidsoppgaveFormAG
        onSubmit={(data) => {
          lagreOppgave
            .mutateAsync(nyArbeidsoppgaveInformasjon(data))
            .then(() => {
              setLeggerTilOppgave(false);
            });
        }}
        isSubmitting={lagreOppgave.isPending}
        isErrorSavingOppgave={lagreOppgave.isError}
        onCancel={() => setLeggerTilOppgave(false)}
      />
    </SpacedPanel>
  );
};
