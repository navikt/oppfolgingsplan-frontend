/// <reference types="cypress" />

import {
  ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA,
  ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO,
  ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON,
  ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON,
  LANDING_OPPFOLGINGSPLAN_TEASER,
  NAVIGATION_NESTE_STEG_BUTTON,
  SEPLANEN_ENIG_I_PLANEN_CHECKBOX,
  SEPLANEN_EVALUERES_INNEN,
  SEPLANEN_JEG_ER_FERDIG_BUTTON,
  SEPLANEN_SEND_TIL_GODKJENNING_BUTTON,
  TILTAK_BESKRIVELSE_TEXTAREA,
  TILTAK_LAGRE_BUTTON,
  TILTAK_LEGG_TIL_NYTT_TILTAK_BUTTON,
  TILTAK_OVERSKRIFT_TEXTFIELD,
  TILTAK_SLUTTDATO,
  TILTAK_STARTDATO,
} from "../../dataTestId";

describe("Create and submit plan happy-case", () => {
  it("Creates arbeidsoppgaver, tiltak and sends the plan to arbeidsgiver for approval", () => {
    cy.visit("/syk/oppfolgingsplaner/sykmeldt");
    cy.selectTestScenario("UNDERARBEID");

    cy.getByTestid(LANDING_OPPFOLGINGSPLAN_TEASER).click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/arbeidsoppgaver");
    });

    // Legger til arbeidsoppgave og går videre til tiltak
    cy.getByTestid(ARBEIDSOPPGAVE_LEGG_TIL_NY_OPPGAVE_BUTTON).click();

    cy.getByTestid(ARBEIDSOPPGAVE_BESKRIVELSE_TEXTAREA).type(
      "Her er en ny arbeidsoppgave!"
    );

    cy.getByTestid(ARBEIDSOPPGAVE_KAN_GJENNOMFOERES_RADIO).click();

    cy.getByTestid(ARBEIDSOPPGAVE_LAGRE_OPPGAVE_BUTTON).click();

    cy.getByTestid(NAVIGATION_NESTE_STEG_BUTTON).click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/tiltak");
    });

    //Legger til tiltak og går videre til se planen
    cy.getByTestid(TILTAK_LEGG_TIL_NYTT_TILTAK_BUTTON).click();

    cy.getByTestid(TILTAK_OVERSKRIFT_TEXTFIELD).type("Et nytt og flott tiltak");

    cy.getByTestid(TILTAK_BESKRIVELSE_TEXTAREA).type(
      "En beskrivelse av tiltaket.."
    );

    cy.getByTestid(TILTAK_STARTDATO).type("01.01.2025");

    cy.getByTestid(TILTAK_SLUTTDATO).type("01.05.2025");

    cy.getByTestid(TILTAK_LAGRE_BUTTON).click();

    cy.getByTestid(NAVIGATION_NESTE_STEG_BUTTON).click();

    cy.location().should((location) => {
      expect(location.pathname).to.include("/seplanen");
    });

    //Sender inn planen og går til status-siden
    cy.getByTestid(SEPLANEN_JEG_ER_FERDIG_BUTTON).click();

    cy.getByTestid(SEPLANEN_EVALUERES_INNEN).click();
    cy.get(".navds-popover").get("button").contains("9").click();

    cy.getByTestid(SEPLANEN_ENIG_I_PLANEN_CHECKBOX).click();

    cy.getByTestid(SEPLANEN_SEND_TIL_GODKJENNING_BUTTON).click();

    cy.contains("Status på oppfølgingsplan");
  });
});
