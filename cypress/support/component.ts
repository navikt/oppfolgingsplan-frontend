import "@navikt/ds-css/dist/index.css";
import { mount, MountReturn } from "cypress/react18";
import { MockOptions, mountWithMocks } from "../utils/mountWithMocks";
import "./commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithMocks: (
        componentUnderTest: JSX.Element,
        options?: MockOptions
      ) => Cypress.Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("mountWithMocks", mountWithMocks);
