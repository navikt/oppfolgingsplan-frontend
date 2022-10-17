import {ArbeidsoppgaveHeading} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveHeading";
import {KanIkkeBeskrivelse} from "@/common/components/arbeidsoppgaver/KanIkkeBeskrivelse";
import {OpprettetAv} from "@/common/components/arbeidsoppgaver/OpprettetAv";
import {TilretteleggingsBeskrivelse} from "@/common/components/arbeidsoppgaver/TilretteleggingsBeskrivelse";
import {Card} from "@/common/components/card/Card";
import {CardHeader} from "@/common/components/card/CardHeader";
import {AddColored} from "@/common/components/icons/AddColored";
import {texts} from "@/common/components/oversikt/texts";
import {KANGJENNOMFOERES} from "@/common/konstanter";
import {ErrorColored, SuccessColored, WarningColored} from "@navikt/ds-icons";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

interface Props {
    arbeidsoppgave: Arbeidsoppgave;
}

export const ArbeidsoppgaveCard = ({
                                       arbeidsoppgave
                                   }: Props) => {
    const type = arbeidsoppgave.gjennomfoering?.kanGjennomfoeres

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
                </Card>
            )}
        </>
    )
};
