import React from "react";
import { ArbeidsoppgaveCard } from "./arbeidsoppgavecard/ArbeidsoppgaveCard";
import { ArbeidsOppgaveDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  arbeidsoppgaver: ArbeidsOppgaveDTO[];
  arbeidstakerFnr: string;
}

export const LagredeArbeidsoppgaver = ({
  arbeidsoppgaver,
  arbeidstakerFnr,
}: Props) => {
  arbeidsoppgaver.sort((a, b) => {
    return b.arbeidsoppgaveId - a.arbeidsoppgaveId;
  });

  return (
    <>
      {arbeidsoppgaver.map((arbeidsoppgave: ArbeidsOppgaveDTO, idx: number) => (
        <ArbeidsoppgaveCard
          arbeidstakerFnr={arbeidstakerFnr}
          arbeidsoppgave={arbeidsoppgave}
          readonly={false}
          key={`arbeidsoppgaver-list-${idx}`}
        />
      ))}
    </>
  );
};
