import "@navikt/ds-css/dist/index.css";
import { mount } from "cypress/react18";
import { mountWithMocks } from "../utils/mountWithMocks";
import "./commands";

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mountWithMocks", mountWithMocks);
