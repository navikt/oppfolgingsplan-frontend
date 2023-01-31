import { ArbeidsoppgaveCard } from "./ArbeidsoppgaveCard";
import React from "react";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";

interface Props {
  innloggetFnr: string;
  arbeidsoppgaver: Arbeidsoppgave[];
}

export const LagredeArbeidsoppgaver = ({
  innloggetFnr,
  arbeidsoppgaver,
}: Props) => {
  arbeidsoppgaver.sort((a, b) => {
    return b.arbeidsoppgaveId - a.arbeidsoppgaveId;
  });

  return (
    <>
      {arbeidsoppgaver.map((arbeidsoppgave: Arbeidsoppgave, idx: number) => (
        <ArbeidsoppgaveCard
          innloggetFnr={innloggetFnr}
          arbeidsoppgave={arbeidsoppgave}
          readonly={false}
          key={`arbeidsoppgaver-list-${idx}`}
        />
      ))}
    </>
  );
};
