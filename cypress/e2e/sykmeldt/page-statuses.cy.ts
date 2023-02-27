/// <reference types="cypress" />
describe("Checks that the correct pages are shown for each status", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/syk/oppfolgingsplaner/sykmeldt");
  });

  it("Selects godkjent plan and navigates to status page", () => {
    cy.selectTestScenario("GODKJENTPLAN");

    cy.get("#OppfolgingsplanLink").click();

    cy.contains("Godkjent plan for Hogwarts School of Witchcraft and Wizardry");
  });

  it("Selects sendt plan til godkjenning and navigates to status page", () => {
    cy.selectTestScenario("SYKMELDT_HAR_SENDT_TIL_GODKJENNING");

    cy.get("#OppfolgingsplanLink").click();

    cy.contains("Planen er sendt til godkjenning");
  });

  it("Selects mottatt plan for godkjenning and navigates to status page", () => {
    cy.selectTestScenario("ARBEIDSGIVER_HAR_SENDT_TIL_GODKJENNING");

    cy.get("#OppfolgingsplanLink").click();

    cy.contains(
      "Du har mottatt en ny plan for Hogwarts School of Witchcraft and Wizardry"
    );
  });
});

export {};
