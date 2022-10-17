import {useLagreArbeidsoppgaveSM} from "@/common/api/queries/sykmeldt/oppgaveQueriesSM";
import {ArbeidsoppgaveForm, OppgaveFormValues} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveForm";
import {ArbeidsoppgaveFormHeading} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveFormHeading";
import PlusIcon from "@/common/components/icons/PlusIcon";
import {SpacedPanel} from "@/common/components/wrappers/SpacedPanel";
import {useOppfolgingsplanRouteId} from "@/common/hooks/routeHooks";
import {TILRETTELEGGING} from "@/common/konstanter";
import {Button} from "@navikt/ds-react";
import React, {useState} from "react";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

export const NyArbeidsoppgave = () => {
    const lagreOppgave = useLagreArbeidsoppgaveSM();
    const [leggerTilOppgave, setLeggerTilOppgave] = useState(false);

    const nyArbeidsoppgaveInformasjon = (data: OppgaveFormValues): Partial<Arbeidsoppgave> => {
        return {
                arbeidsoppgavenavn: data.navnPaaArbeidsoppgaven,
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

    if (!leggerTilOppgave) {
        return (
            <SpacedPanel border={true}>
                <ArbeidsoppgaveFormHeading/>
                <Button
                    variant={"secondary"}
                    icon={<PlusIcon/>}
                    onClick={() => setLeggerTilOppgave(true)}
                >
                    Legg til ny arbeidsoppgave
                </Button>
            </SpacedPanel>
        )
    }

    return (
        <SpacedPanel border={true}>
            <ArbeidsoppgaveFormHeading/>
            <ArbeidsoppgaveForm
                onSubmit={(data) => {
                    lagreOppgave(nyArbeidsoppgaveInformasjon(data));
                    setLeggerTilOppgave(false);
                }}
                onCancel={() => setLeggerTilOppgave(false)}
            />
        </SpacedPanel>
    );
};
