/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import { TestScenario } from "../src/server/data/mock/getMockDb";
import { DataTestId } from "./dataTestId";
import { MockOptions } from "./utils/mountWithMocks";
import { mount, MountReturn } from "cypress/react18";

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
