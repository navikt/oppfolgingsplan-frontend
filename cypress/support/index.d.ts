/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { mount, MountReturn } from "cypress/react18";
import { DataTestId } from "../dataTestId";
import { MockOptions } from "../utils/mountWithMocks";
import { TestScenario } from "../../src/server/data/mock/getMockDb";

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

      mount: typeof mount;
      mountWithMocks: (
        componentUnderTest: JSX.Element,
        options?: MockOptions
      ) => Cypress.Chainable<MountReturn>;
    }
  }
}
