import {ArbeidsoppgaveCard} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveCard";
import {KANGJENNOMFOERES} from "@/common/konstanter";
import {Heading} from "@navikt/ds-react";
import {Arbeidsoppgave,} from "../../../../schema/oppfolgingsplanSchema";
import {ContentWrapper} from "../ContentWrapper";
import {texts} from "../texts";

interface Props {
    arbeidstakerFnr: string;
    arbeidsoppgaver: Arbeidsoppgave[];
}

export const ArbeidsoppgaveList = ({arbeidstakerFnr, arbeidsoppgaver}: Props) => {

    const sorterArbeidsoppgaverEtterTypeOgOpprettet = (arbeidsoppgaver: Arbeidsoppgave[]) => {
        const order = [KANGJENNOMFOERES.KAN, KANGJENNOMFOERES.TILRETTELEGGING, KANGJENNOMFOERES.KAN_IKKE, KANGJENNOMFOERES.IKKE_VURDERT, undefined]
        return arbeidsoppgaver.sort((a, b) => {
            if (order.indexOf(b.gjennomfoering?.kanGjennomfoeres!) < order.indexOf(a.gjennomfoering?.kanGjennomfoeres!)) return 1;
            if (order.indexOf(b.gjennomfoering?.kanGjennomfoeres!) > order.indexOf(a.gjennomfoering?.kanGjennomfoeres!)) return -1;
            else {
                return b.arbeidsoppgaveId - a.arbeidsoppgaveId;
            }
        });
    };

    const sortedArbeidsoppgaver = sorterArbeidsoppgaverEtterTypeOgOpprettet(
        arbeidsoppgaver
    );

    return (
        <ContentWrapper>
            <Heading level="3" size="medium">
                {texts.arbeidsoppgaveList.title}
            </Heading>
            {sortedArbeidsoppgaver.length && (
                <div>
                    {arbeidsoppgaver.map((arbeidsoppgave: Arbeidsoppgave, idx: number) => (
                        <ArbeidsoppgaveCard
                            arbeidstakerFnr={arbeidstakerFnr}
                            arbeidsoppgave={arbeidsoppgave}
                            readonly={true}
                            key={`arbeidsoppgaver-list-${idx}`}
                        />
                    ))}
                </div>
            )}
        </ContentWrapper>
    );
};
