import {useLagreArbeidsoppgaveSM} from "@/common/api/queries/sykmeldt/oppgaveQueriesSM";
import {ArbeidsoppgaveForm, OppgaveFormValues} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveForm";
import {TILRETTELEGGING} from "@/common/konstanter";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

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

    const arbeidsoppgaveInformasjon = (data: OppgaveFormValues): Arbeidsoppgave => {
        return {
            ...arbeidsoppgave,
            gjennomfoering: {
                kanGjennomfoeres: data.kanGjennomfores,
                paaAnnetSted: data.tilrettelegging
                    ? data.tilrettelegging.includes(
                        TILRETTELEGGING.PAA_ANNET_STED
                    )
                    : false,
                medMerTid: data.tilrettelegging
                    ? data.tilrettelegging.includes(
                        TILRETTELEGGING.MED_MER_TID
                    )
                    : false,
                medHjelp: data.tilrettelegging
                    ? data.tilrettelegging.includes(
                        TILRETTELEGGING.MED_HJELP
                    )
                    : false,
                kanBeskrivelse: data.kanBeskrivelse,
                kanIkkeBeskrivelse: data.kanIkkeBeskrivelse,
            },
        };
    };

    return show ? (
        <ArbeidsoppgaveForm
            defaultFormValues={{
                navnPaaArbeidsoppgaven: arbeidsoppgave.arbeidsoppgavenavn,
                kanGjennomfores: arbeidsoppgave.gjennomfoering?.kanGjennomfoeres!!,
                tilrettelegging: [TILRETTELEGGING.MED_HJELP],
                kanBeskrivelse: arbeidsoppgave.gjennomfoering?.kanBeskrivelse!!,
                kanIkkeBeskrivelse: arbeidsoppgave.gjennomfoering?.kanIkkeBeskrivelse!!,
            }}
            onSubmit={(data) => {
                lagreArbeidsoppgave(arbeidsoppgaveInformasjon(data));
                doneEditing();
            }}
            onCancel={doneEditing}
            navnIsEditable={false}
        />
    ) : null
};
