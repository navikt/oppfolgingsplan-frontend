/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
import { TestScenario } from "../../src/server/data/mock/getMockDb";
import { DataTestId } from "../dataTestId";

Cypress.Commands.add("selectTestScenario", (testScenario: TestScenario) => {
  cy.get("#TestScenarioSelector").click();
  cy.get(`input[value=${testScenario}]`).click();
  cy.get("#VelgScenarioButton").click();
});

Cypress.Commands.add("getByDataTestId", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    interface Chainable<Subject = any> {
      selectTestScenario(testScenario: TestScenario): Chainable<Subject>;

      getByDataTestId(selector: DataTestId): Chainable<Subject>;
    }
  }
}
