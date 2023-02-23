import activeMockData, { getMockSetupForScenario } from "./activeMockData";
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
import { TEST_SESSION_ID } from "../../../api/axios/axios";
import { handleQueryParamError } from "../../utils/errors";
import { NextApiRequest } from "next";

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
  var _mockDb: { [key: string]: MockSetup };
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._mockDb = global._mockDb || ["123", activeMockData];

export function assignNewDbSetup(newSetup: MockSetup, sessionId: string): void {
  global._mockDb[sessionId] = newSetup;
}

const getMockDb = (req: NextApiRequest): MockSetup => {
  const sessionId = req.headers[TEST_SESSION_ID];

  if (typeof sessionId !== "string") {
    return handleQueryParamError(sessionId);
  }

  // global._mockDb = new FakeMockDB();
  let storedSetup = global._mockDb[sessionId];

  if (!storedSetup) {
    assignNewDbSetup(getMockSetupForScenario("UNDERARBEID"), sessionId);
    storedSetup = global._mockDb[sessionId];
  }

  return storedSetup;
};

export default getMockDb;
