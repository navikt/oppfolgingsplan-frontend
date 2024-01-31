import {
  ArbeidsoppgaveFormSM,
  OppgaveFormValues,
} from "./ArbeidsoppgaveFormSM";
import { TILRETTELEGGING } from "../../constants/konstanter";
import { useLagreArbeidsoppgave } from "../../api/queries/oppfolgingsplan/arbeidsoppgaveQueries";
import {
  ArbeidsOppgaveDTO,
  GjennomforingDTO,
} from "../../schema/oppfolgingsplanSchema";

interface Props {
  show: boolean;
  arbeidsoppgave: ArbeidsOppgaveDTO;

  doneEditing(): void;
}

export const EditerArbeidsoppgave = ({
  show,
  arbeidsoppgave,
  doneEditing,
}: Props) => {
  const lagreArbeidsoppgave = useLagreArbeidsoppgave();

  const arbeidsoppgaveInformasjon = (
    data: OppgaveFormValues,
  ): ArbeidsOppgaveDTO => {
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

  const getTilretteleggingFormData = (
    gjennomforing?: GjennomforingDTO | null,
  ) => {
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
        arbeidsoppgavenavn: arbeidsoppgave.arbeidsoppgavenavn,
        kanGjennomfores: arbeidsoppgave.gjennomfoering?.kanGjennomfoeres || "",
        tilrettelegging: getTilretteleggingFormData(
          arbeidsoppgave.gjennomfoering,
        ),
        kanBeskrivelse: arbeidsoppgave.gjennomfoering?.kanBeskrivelse || "",
        kanIkkeBeskrivelse:
          arbeidsoppgave.gjennomfoering?.kanIkkeBeskrivelse || "",
      }}
      onSubmit={(data) => {
        lagreArbeidsoppgave
          .mutateAsync(arbeidsoppgaveInformasjon(data))
          .then(() => {
            doneEditing();
          });
      }}
      isSubmitting={lagreArbeidsoppgave.isPending}
      isErrorSavingOppgave={lagreArbeidsoppgave.isError}
      onCancel={doneEditing}
      navnIsEditable={false}
    />
  ) : null;
};
