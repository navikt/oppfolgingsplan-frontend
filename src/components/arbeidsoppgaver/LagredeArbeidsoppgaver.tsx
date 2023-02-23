import { ArbeidsoppgaveCard } from "./ArbeidsoppgaveCard";
import React from "react";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";

interface Props {
  arbeidsoppgaver: Arbeidsoppgave[];
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
      {arbeidsoppgaver.map((arbeidsoppgave: Arbeidsoppgave, idx: number) => (
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
