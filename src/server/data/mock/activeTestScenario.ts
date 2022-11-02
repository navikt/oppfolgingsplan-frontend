import {
  Oppfolgingsplan,
  Person,
  Stilling,
  Virksomhet,
} from "../../../schema/oppfolgingsplanSchema";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { Kontaktinfo } from "../../../schema/kontaktinfoSchema";
import { Tilgang } from "../../../schema/tilgangSchema";
import { assignNewMockSetup } from "./activeMockSM";

export interface MockSetupSM {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
  virksomhet: Virksomhet[];
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
  person: Person;
  kontaktinfo: Kontaktinfo;
  tilgang: Tilgang;
}

export enum TestScenario {
  "INGENPLAN" = "INGENPLAN",
  "GODKJENNPLANAVSLATT" = "GODKJENNPLANAVSLATT",
  "GODKJENNPLANSENDT" = "GODKJENNPLANSENDT",
}

export let activeTestScenario = TestScenario.INGENPLAN;

export const setActiveTestScenario = (scenario: TestScenario) => {
  activeTestScenario = scenario;
  assignNewMockSetup(scenario);
};
