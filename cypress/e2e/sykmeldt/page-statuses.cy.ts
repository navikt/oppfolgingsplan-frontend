/// <reference types="cypress" />
import { DataTestId } from "../../dataTestId";

describe("Checks that the correct pages are shown for each status", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/syk/oppfolgingsplaner/sykmeldt");
  });

  it("Selects godkjent plan and navigates to status page", () => {
    cy.selectTestScenario("GODKJENTPLAN");

    cy.getByDataTestId(DataTestId.LANDING_OPPFOLGINGSPLAN_TEASER).click();

    cy.contains("Godkjent plan for Hogwarts School of Witchcraft and Wizardry");
  });

  it("Selects sendt plan til godkjenning and navigates to status page", () => {
    cy.selectTestScenario("SYKMELDT_HAR_SENDT_TIL_GODKJENNING");

    cy.getByDataTestId(DataTestId.LANDING_OPPFOLGINGSPLAN_TEASER).click();

    cy.contains("Planen er sendt til godkjenning");
  });

  it("Selects mottatt plan for godkjenning and navigates to status page", () => {
    cy.selectTestScenario("ARBEIDSGIVER_HAR_SENDT_TIL_GODKJENNING");

    cy.getByDataTestId(DataTestId.LANDING_OPPFOLGINGSPLAN_TEASER).click();

    cy.contains(
      "Du har mottatt en ny plan for Hogwarts School of Witchcraft and Wizardry"
    );
  });
});
