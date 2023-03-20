import React from "react";
import Arbeidsoppgaver from "./arbeidsoppgaver";
import { planUnderArbeidScenario } from "../../../server/data/mock/testscenarios/planunderarbeid/planUnderArbeidScenario";
import {
  ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA,
  ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO,
  ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON,
  ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON,
} from "../../../../cypress/dataTestId";

describe("<Arbeidsoppgaver />", () => {
  const mockSetup = planUnderArbeidScenario;

  it("Renders arbeidsoppgave page and adds a new arbeidsoppgave", () => {
    cy.intercept(
      {
        method: "POST",
        url: `/api/oppfolgingsplan/${mockSetup.oppfolgingsplaner[0].id}/arbeidsoppgave/lagre`,
      },
      []
    ).as("lagreArbeidsoppgave");

    cy.mountWithMocks(<Arbeidsoppgaver />, {
      interceptDataApis: mockSetup,
      mockRouter: true,
      mockReactQuery: true,
      routerOptions: {
        pathname: "/sykmeldt",
        query: {
          oppfolgingsdialogId: mockSetup.oppfolgingsplaner[0].id.toString(),
        },
      },
    });

    cy.getByTestid(ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON).click();

    cy.getByTestid(ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA).type(
      "Enda en arbeidsoppgave.."
    );

    cy.getByTestid(ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO).click();

    cy.getByTestid(ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON).click();

    cy.wait("@lagreArbeidsoppgave");

    const expectedArbeidsoppgaveData = {
      arbeidsoppgavenavn: "Enda en arbeidsoppgave..",
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
