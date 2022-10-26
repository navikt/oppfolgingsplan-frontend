import { ArbeidsoppgaveCard } from "./ArbeidsoppgaveCard";
import React from "react";
import { Arbeidsoppgave } from "../../schema/oppfolgingsplanSchema";

interface Props {
  arbeidstakerFnr: string;
  arbeidsoppgaver: Arbeidsoppgave[];
}

export const LagredeArbeidsoppgaver = ({
  arbeidstakerFnr,
  arbeidsoppgaver,
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
