import {ArbeidsoppgaveCard} from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveCard";
import {KANGJENNOMFOERES} from "@/common/konstanter";
import React from "react";
import {Arbeidsoppgave} from "../../../schema/oppfolgingsplanSchema";

interface Props {
    arbeidstakerFnr: string;
    arbeidsoppgaver: Arbeidsoppgave[];
}

export const LagredeArbeidsoppgaver = ({arbeidstakerFnr, arbeidsoppgaver}: Props) => {

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

    sorterArbeidsoppgaverEtterTypeOgOpprettet(arbeidsoppgaver);

    return (
        <>
            <div>
                {arbeidsoppgaver.map((arbeidsoppgave: Arbeidsoppgave, idx: number) => (
                    <ArbeidsoppgaveCard
                        arbeidstakerFnr={arbeidstakerFnr}
                        arbeidsoppgave={arbeidsoppgave}
                        readonly={false}
                        key={`arbeidsoppgaver-list-${idx}`}
                    />
                ))}
            </div>
        </>
    );

};
