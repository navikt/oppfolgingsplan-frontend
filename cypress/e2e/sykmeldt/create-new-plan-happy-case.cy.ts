/// <reference types="cypress" />

import { DataTestId } from "../../dataTestId";

describe("Create and submit plan happy-case", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/syk/oppfolgingsplaner/sykmeldt");
    cy.selectTestScenario("UNDERARBEID");
  });

  it("Creates arbeidsoppgaver, tiltak and sends the plan to arbeidsgiver for approval", () => {
    cy.getByDataTestId(DataTestId.LANDING_OPPFOLGINGSPLAN_TEASER).click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/arbeidsoppgaver");
    });

    // Legger til arbeidsoppgave og går videre til tiltak
    cy.getByDataTestId(
      DataTestId.ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON
    ).click();

    cy.getByDataTestId(DataTestId.ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA).type(
      "Her er en ny arbeidsoppgave!"
    );

    cy.getByDataTestId(
      DataTestId.ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO
    ).click();

    cy.getByDataTestId(DataTestId.ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON).click();

    cy.getByDataTestId(DataTestId.NAVIGATION_NESTE_STEG_BUTTON)
      .contains("Neste steg")
      .click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/tiltak");
    });

    //Legger til tiltak og går videre til se planen
    cy.getByDataTestId(DataTestId.TILTAK_LEGG_TIL_NYTT_TILTAK_BUTTON).click();

    cy.getByDataTestId(DataTestId.TILTAK_OVERSKRIFT_TEXTFIELD).type(
      "Et nytt og flott tiltak"
    );

    cy.getByDataTestId(DataTestId.TILTAK_BESKRIVELSE_TEXTAREA).type(
      "En beskrivelse av tiltaket.."
    );

    cy.getByDataTestId(DataTestId.TILTAK_STARTDATO).type("01.01.2025");

    cy.getByDataTestId(DataTestId.TILTAK_SLUTTDATO).type("01.05.2025");

    cy.getByDataTestId(DataTestId.TILTAK_LAGRE_BUTTON).click();

    cy.getByDataTestId(DataTestId.NAVIGATION_NESTE_STEG_BUTTON).click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/seplanen");
    });

    //Sender inn planen og går til status-siden
    cy.getByDataTestId(DataTestId.SEPLANEN_JEG_ER_FERDIG_BUTTON).click();

    cy.getByDataTestId(DataTestId.SEPLANEN_EVALUERES_INNEN).click();
    cy.get(".navds-popover").get("button").contains("9").click();

    cy.getByDataTestId(DataTestId.SEPLANEN_ENIG_I_PLANEN_CHECKBOX).click();

    cy.getByDataTestId(DataTestId.SEPLANEN_SEND_TIL_GODKJENNING_BUTTON).click();

    cy.contains("Status på oppfølgingsplan");
  });
});
