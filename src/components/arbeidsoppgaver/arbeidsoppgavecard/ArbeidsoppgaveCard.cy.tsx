import React from "react";
import { ArbeidsoppgaveCard } from "./ArbeidsoppgaveCard";
import { defaultOppfolgingsplanerMockData } from "../../../server/data/mock/defaultData/oppfolgingsplanservice/defaultOppfolgingsplanerMockData";

describe("<ArbeidsoppgaveCard />", () => {
  const testPlan = defaultOppfolgingsplanerMockData[0];

  it("Can change and delete arbeidsoppgaver for sykmeldt", () => {
    cy.mountWithMocks(
      <ArbeidsoppgaveCard
        readonly={false}
        arbeidstakerFnr={testPlan.arbeidstaker.fnr}
        arbeidsoppgave={testPlan.arbeidsoppgaveListe[0]}
      />,
      {
        mockReactQuery: true,
        mockRouter: true,
      }
    );

    cy.findByRole("button", { name: /Endre/i }).should("exist");
    cy.findByRole("button", { name: /Slett/i }).should("exist");
  });

  it("Can not change and delete arbeidsoppgaver for arbeidsgiver", () => {
    cy.mountWithMocks(
      <ArbeidsoppgaveCard
        readonly={false}
        arbeidstakerFnr={testPlan.arbeidstaker.fnr}
        arbeidsoppgave={testPlan.arbeidsoppgaveListe[0]}
      />,
      {
        mockReactQuery: true,
        mockRouter: true,
        isArbeidsgiver: true,
      }
    );

    cy.findByRole("button", { name: /Endre/i }).should("not.exist");
    cy.findByRole("button", { name: /Slett/i }).should("not.exist");
  });
});
