/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { TestScenario } from "../../src/server/data/mock/getMockDb";
import { DataTestId } from "../dataTestId";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("selectTestScenario", (testScenario: TestScenario) => {
  cy.get("#TestScenarioSelector").click();
  cy.get(`input[value=${testScenario}]`).click();
  cy.get("#VelgScenarioButton").click();
});

Cypress.Commands.add("getByTestid", (selector: DataTestId, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    interface Chainable<Subject = any> {
      selectTestScenario(testScenario: TestScenario): Chainable<Subject>;

      getByTestid(
        dataTestAttribute: DataTestId,
        args?: never
      ): Chainable<JQuery>;
    }
  }
}
