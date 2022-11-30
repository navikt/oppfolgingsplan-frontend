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
import { getMockSetupForScenario } from "./activeMockSM";
import { assignNewDbSetup } from "./getMockDb";

export interface MockSetupSM {
  oppfolgingsplaner: Oppfolgingsplan[];
  sykmeldinger: Sykmelding[];
  virksomhet: Virksomhet[];
  stillinger: Stilling[];
  narmesteLedere: NarmesteLeder[];
  person: Person;
  kontaktinfo: Kontaktinfo;
  tilgang: Tilgang;
  activeTestScenario: TestScenario;
}

export type TestScenario =
  | "INGENPLAN"
  | "GODKJENNPLANAVSLATT"
  | "GODKJENNPLANSENDT"
  | "GODKJENNPLANMOTTATT";

export const setActiveTestScenario = (scenario: TestScenario) => {
  assignNewDbSetup(getMockSetupForScenario(scenario));
};
