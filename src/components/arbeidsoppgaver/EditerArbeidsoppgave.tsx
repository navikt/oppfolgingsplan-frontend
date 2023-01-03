import { useLagreArbeidsoppgaveSM } from "api/queries/sykmeldt/oppgaveQueriesSM";
import {
  ArbeidsoppgaveFormSM,
  OppgaveFormValues,
} from "./ArbeidsoppgaveFormSM";
import { TILRETTELEGGING } from "constants/konstanter";
import {
  Arbeidsoppgave,
  Gjennomforing,
} from "../../schema/oppfolgingsplanSchema";

interface Props {
  show: Boolean;
  arbeidsoppgave: Arbeidsoppgave;

  doneEditing(): void;
}

export const EditerArbeidsoppgave = ({
  show,
  arbeidsoppgave,
  doneEditing,
}: Props) => {
  const lagreArbeidsoppgave = useLagreArbeidsoppgaveSM();

  const arbeidsoppgaveInformasjon = (
    data: OppgaveFormValues
  ): Arbeidsoppgave => {
    return {
      ...arbeidsoppgave,
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

  const getTilretteleggingFormData = (gjennomforing?: Gjennomforing | null) => {
    const tilrettelegging: string[] = [];

    if (gjennomforing?.medHjelp) {
      tilrettelegging.push(TILRETTELEGGING.MED_HJELP);
    }
    if (gjennomforing?.paaAnnetSted) {
      tilrettelegging.push(TILRETTELEGGING.PAA_ANNET_STED);
    }
    if (gjennomforing?.medMerTid) {
      tilrettelegging.push(TILRETTELEGGING.MED_MER_TID);
    }

    return tilrettelegging;
  };

  return show ? (
    <ArbeidsoppgaveFormSM
      defaultFormValues={{
        navnPaaArbeidsoppgaven: arbeidsoppgave.arbeidsoppgavenavn,
        kanGjennomfores: arbeidsoppgave.gjennomfoering?.kanGjennomfoeres!!,
        tilrettelegging: getTilretteleggingFormData(
          arbeidsoppgave.gjennomfoering
        ),
        kanBeskrivelse: arbeidsoppgave.gjennomfoering?.kanBeskrivelse!!,
        kanIkkeBeskrivelse: arbeidsoppgave.gjennomfoering?.kanIkkeBeskrivelse!!,
      }}
      onSubmit={(data) => {
        lagreArbeidsoppgave
          .mutateAsync(arbeidsoppgaveInformasjon(data))
          .then(() => {
            doneEditing();
          });
      }}
      isSubmitting={lagreArbeidsoppgave.isLoading}
      isErrorSavingOppgave={lagreArbeidsoppgave.isError}
      onCancel={doneEditing}
      navnIsEditable={false}
    />
  ) : null;
};
