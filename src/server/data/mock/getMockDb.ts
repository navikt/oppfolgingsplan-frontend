import activeMockData from "./activeMockData";
import {
  OppfolgingsplanDTO,
  VirksomhetDTO,
} from "../../../schema/oppfolgingsplanSchema";
import { Sykmelding } from "../../../schema/sykmeldingSchema";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { KontaktinfoDTO } from "../../../schema/kontaktinfoSchema";
import { Tilgang } from "../../../schema/tilgangSchema";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { PersonV3DTO } from "../../../schema/personSchemas";

export type TestScenario =
  | "INGENPLAN"
  | "TIDLIGEREPLANER"
  | "UNDERARBEID"
  | "GODKJENTPLAN"
  | "SYKMELDT_HAR_SENDT_TIL_GODKJENNING_AG_HAR_ENDRET"
  | "SYKMELDT_HAR_SENDT_TIL_GODKJENNING"
  | "ARBEIDSGIVER_HAR_SENDT_TIL_GODKJENNING";

export interface MockSetup {
  oppfolgingsplaner: OppfolgingsplanDTO[];
  sykmeldinger: Sykmelding[];
  virksomhet: VirksomhetDTO[];
  narmesteLedere: NarmesteLeder[];
  person: PersonV3DTO;
  kontaktinfo: KontaktinfoDTO;
  tilgang: Tilgang;
  sykmeldt: Sykmeldt;
  activeTestScenario: TestScenario;
}

declare global {
  // eslint-disable-next-line no-var
  var _mockDb: MockSetup;
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._mockDb = global._mockDb || activeMockData;

/**
 * Used ONLY by tests to reset the fake DB to initial values between tests
 */
export function resetMockDb(): void {
  if (process.env.NODE_ENV !== "test")
    throw new Error("This is a test only utility");

  global._mockDb = activeMockData;
}

export function assignNewDbSetup(newSetup: MockSetup): void {
  global._mockDb = newSetup;
}

const getMockDb = (): MockSetup => {
  // global._mockDb = new FakeMockDB();
  return global._mockDb;
};

export default getMockDb;
