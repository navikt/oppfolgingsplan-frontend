import React from "react";
import { NyArbeidsoppgaveSM } from "./NyArbeidsoppgaveSM";
import {
  ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA,
  ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO,
  ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON,
  ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON,
} from "../../../cypress/dataTestId";

describe("<NyArbeidsoppgaveSM />", () => {
  it("Lagre ny arbeisoppgave", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/oppfolgingsplan/123/arbeidsoppgave/lagre",
      },
      []
    ).as("lagreArbeidsoppgave");

    cy.mountWithMocks(<NyArbeidsoppgaveSM />, {
      mockReactQuery: true,
      mockRouter: true,
      oppfolgingsplanRouteId: "123",
    });

    cy.getByTestid(ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON).click();

    cy.getByTestid(ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA).type("Testing testing");

    cy.getByTestid(ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO).click();

    cy.getByTestid(ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON).click();

    cy.wait("@lagreArbeidsoppgave");

    const expectedArbeidsoppgaveData = {
      arbeidsoppgavenavn: "Testing testing",
      gjennomfoering: {
        kanGjennomfoeres: "KAN",
        paaAnnetSted: false,
        medMerTid: false,
        medHjelp: false,
      },
    };

    cy.get("@lagreArbeidsoppgave")
      .its("request.body")
      .should("deep.equal", expectedArbeidsoppgaveData);
  });
});
