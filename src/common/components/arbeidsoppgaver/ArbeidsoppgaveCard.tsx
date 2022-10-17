import {ArbeidsoppgaveHeading} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveHeading";
import {EditerArbeidsoppgave} from "@/common/components/arbeidsoppgaver/EditerArbeidsoppgave";
import {KanIkkeBeskrivelse} from "@/common/components/arbeidsoppgaver/KanIkkeBeskrivelse";
import {Knapperad} from "@/common/components/arbeidsoppgaver/Knapperad";
import {OpprettetAv} from "@/common/components/arbeidsoppgaver/OpprettetAv";
import {TilretteleggingsBeskrivelse} from "@/common/components/arbeidsoppgaver/TilretteleggingsBeskrivelse";
import {VurderButton} from "@/common/components/arbeidsoppgaver/VurderButton";
import {VurderingFraSykmeldt} from "@/common/components/arbeidsoppgaver/VurderingFraSykmeldt";
import {Card} from "@/common/components/card/Card";
import {CardHeader} from "@/common/components/card/CardHeader";
import {AddColored} from "@/common/components/icons/AddColored";
import {texts} from "@/common/components/oversikt/texts";
import {useAudience} from "@/common/hooks/routeHooks";
import {KANGJENNOMFOERES} from "@/common/konstanter";
import {ErrorColored, SuccessColored, WarningColored} from "@navikt/ds-icons";
import {useState} from "react";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

interface Props {
    arbeidsoppgave: Arbeidsoppgave;
    readonly?: Boolean;
}

export const ArbeidsoppgaveCard = ({
                                       arbeidsoppgave,
                                       readonly = true
                                   }: Props) => {
    const { isAudienceSykmeldt } = useAudience();
    const type = arbeidsoppgave.gjennomfoering?.kanGjennomfoeres
    const [editererArbeidsoppgave, setEditererArbeidsoppgave] = useState(false);

    return (
        <>
            {type === KANGJENNOMFOERES.KAN && (
                <Card>
                    <CardHeader>
                        <SuccessColored/>
                        {texts.arbeidsoppgaveList.cards.kan}
                    </CardHeader>
                    <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn}/>
                    <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn}/>
                </Card>
            )}
            {type === KANGJENNOMFOERES.TILRETTELEGGING && (
                <Card>
                    <CardHeader>
                        <AddColored/>
                        {texts.arbeidsoppgaveList.cards.tilrettelegging}
                    </CardHeader>
                    <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn}/>
                    <TilretteleggingsBeskrivelse gjennomfoering={arbeidsoppgave.gjennomfoering!}/>
                    <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn}/>
                </Card>
            )}
            {type === KANGJENNOMFOERES.KAN_IKKE && (
                <Card>
                    <CardHeader>
                        <ErrorColored/>
                        {texts.arbeidsoppgaveList.cards.kanIkke}
                    </CardHeader>
                    <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn}/>
                    <KanIkkeBeskrivelse gjennomfoering={arbeidsoppgave.gjennomfoering!}/>
                    <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn}/>
                </Card>
            )}
            {type === KANGJENNOMFOERES.IKKE_VURDERT || !type && (
                <Card>
                    <CardHeader>
                        <WarningColored/>
                        {texts.arbeidsoppgaveList.cards.ikkeVurdert}
                    </CardHeader>
                    <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn}/>
                    <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn}/>

                    <VurderingFraSykmeldt show={!readonly}/>
                    <EditerArbeidsoppgave show={editererArbeidsoppgave} arbeidsoppgave={arbeidsoppgave} doneEditing={() => setEditererArbeidsoppgave(false)}/>
                    <Knapperad show={!readonly && !editererArbeidsoppgave}>
                        <VurderButton show={isAudienceSykmeldt} onClick={() => setEditererArbeidsoppgave(true)}/>
                    </Knapperad>

                </Card>
            )}
        </>
    )
};
