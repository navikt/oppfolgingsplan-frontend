import { ArbeidsoppgaveCard } from "./ArbeidsoppgaveCard";
import React from "react";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";

interface Props {
  innloggetFnr: string;
  arbeidsoppgaver: Arbeidsoppgave[];
  arbeidstakerFnr: string;
}

export const LagredeArbeidsoppgaver = ({
  innloggetFnr,
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
          innloggetFnr={innloggetFnr}
          arbeidstakerFnr={arbeidstakerFnr}
          arbeidsoppgave={arbeidsoppgave}
          readonly={false}
          key={`arbeidsoppgaver-list-${idx}`}
        />
      ))}
    </>
  );
};
